import type { APIRoute } from "astro";
import { WebhookSignatureValidator, InvalidWebhookSignatureError } from "mercadopago";
import { confirmPayment } from "../../../lib/confirm-payment";

// Un webhook lo llama Mercado Pago directamente, no nuestro propio frontend
// — por eso es un endpoint de API normal y no una Astro Action (las actions
// están pensadas para que las llame nuestra propia app).
export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
  const secret = import.meta.env.MP_WEBHOOK_SECRET;
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  if (!secret || !dataId || !xSignature) {
    return new Response(null, { status: 401 });
  }

  try {
    WebhookSignatureValidator.validate({
      xSignature,
      xRequestId: xRequestId ?? "",
      dataId,
      secret,
    });
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) {
      return new Response(null, { status: 401 });
    }
    throw error;
  }

  try {
    await confirmPayment(dataId);
    // Mercado Pago espera 200/201 dentro de 22 segundos, o reintenta.
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("[Lester] Error procesando webhook de Mercado Pago:", error);
    return new Response(null, { status: 500 });
  }
};
