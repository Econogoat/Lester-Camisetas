import { e as createComponent, l as renderComponent, n as renderScript, r as renderTemplate, h as createAstro, m as maybeRenderHead, p as Fragment } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../../chunks/Header_B69cff6z.mjs';
import { g as getPaymentClient, a as getAdminClient } from '../../chunks/supabase-admin_Dbzk6FeS.mjs';
export { renderers } from '../../renderers.mjs';

const ESTADO_POR_STATUS = {
  approved: "pagado",
  rejected: "rechazado",
  pending: "pendiente",
  in_process: "pendiente",
  refunded: "reembolsado",
  cancelled: "rechazado"
};
async function confirmPayment(paymentId) {
  const payment = await getPaymentClient().get({ id: paymentId });
  const orderId = payment.external_reference;
  const status = payment.status ?? "pending";
  if (!orderId) return;
  const estado = ESTADO_POR_STATUS[status] ?? "pendiente";
  const supabase = getAdminClient();
  const { data: order } = await supabase.from("orders").select("id, estado_pago").eq("id", orderId).single();
  if (!order || order.estado_pago === "pagado") return;
  await supabase.from("orders").update({ estado_pago: estado, mercadopago_payment_id: String(paymentId) }).eq("id", orderId);
  if (estado !== "pagado") return;
  const { data: items } = await supabase.from("order_items").select("product_variant_id, cantidad").eq("order_id", orderId);
  for (const item of items ?? []) {
    if (!item.product_variant_id) continue;
    await supabase.rpc("decrementar_stock", {
      variant_id: item.product_variant_id,
      cantidad: item.cantidad
    });
  }
}

const $$Astro = createAstro();
const $$Exito = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Exito;
  const paymentId = Astro2.url.searchParams.get("payment_id");
  const externalReference = Astro2.url.searchParams.get("external_reference");
  if (paymentId) {
    try {
      await confirmPayment(paymentId);
    } catch (error) {
      console.error("[Lester] No se pudo confirmar el pago en la p\xE1gina de \xE9xito:", error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\xA1Gracias por tu compra! \u2014 Lester" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="mx-auto max-w-lg px-6 py-20 text-center sm:px-10"> <p class="font-display text-3xl uppercase tracking-wide text-bone">¡Gracias por tu compra!</p> <p class="mt-3 text-sm text-bone/60">
Tu pago se procesó correctamente${externalReference && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` — pedido <span class="text-bone">#${externalReference.slice(0, 8)}</span>` })}`}.
</p> <a href="/" class="mt-8 inline-block border border-steel px-6 py-2.5 text-xs uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Seguir comprando
</a> </div> ` })} ${renderScript($$result, "E:/ecommerce2/lester/src/pages/pedido/exito.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/pages/pedido/exito.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/pedido/exito.astro";
const $$url = "/pedido/exito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Exito,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
