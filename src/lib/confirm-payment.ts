import { getPaymentClient } from "./mercadopago";
import { getAdminClient } from "./supabase-admin";

const ESTADO_POR_STATUS: Record<string, "pagado" | "rechazado" | "pendiente" | "reembolsado"> = {
  approved: "pagado",
  rejected: "rechazado",
  pending: "pendiente",
  in_process: "pendiente",
  refunded: "reembolsado",
  cancelled: "rechazado",
};

/**
 * Confirma un pago contra la API de Mercado Pago y actualiza la orden
 * correspondiente (buscada por external_reference, que es el id de la
 * orden en nuestra base).
 *
 * La llaman dos caminos distintos:
 * 1. El webhook (src/pages/api/webhooks/mercadopago.ts) — el camino real.
 * 2. La página de éxito (src/pages/pedido/exito.astro) — de respaldo, por
 *    si el webhook todavía no llegó (por ejemplo en desarrollo local sin
 *    túnel HTTPS, donde Mercado Pago no puede alcanzar notification_url).
 *
 * Es idempotente a propósito: si la orden ya está "pagado", no vuelve a
 * descontar stock aunque se llame de nuevo (evita duplicar el descuento si
 * el webhook reintenta o si el webhook y la página de éxito confirman el
 * mismo pago casi al mismo tiempo).
 */
export async function confirmPayment(paymentId: string): Promise<void> {
  const payment = await getPaymentClient().get({ id: paymentId });
  const orderId = payment.external_reference as string | undefined;
  const status = (payment.status as string | undefined) ?? "pending";

  if (!orderId) return;

  const estado = ESTADO_POR_STATUS[status] ?? "pendiente";
  const supabase = getAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, estado_pago")
    .eq("id", orderId)
    .single();

  if (!order || order.estado_pago === "pagado") return;

  await supabase
    .from("orders")
    .update({ estado_pago: estado, mercadopago_payment_id: String(paymentId) })
    .eq("id", orderId);

  if (estado !== "pagado") return;

  const { data: items } = await supabase
    .from("order_items")
    .select("product_variant_id, cantidad")
    .eq("order_id", orderId);

  for (const item of items ?? []) {
    if (!item.product_variant_id) continue;
    await supabase.rpc("decrementar_stock", {
      variant_id: item.product_variant_id,
      cantidad: item.cantidad,
    });
  }
}
