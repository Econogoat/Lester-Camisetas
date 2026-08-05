import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  const accessToken = import.meta.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "Falta MP_ACCESS_TOKEN en el .env. Copiá tu Access Token de prueba desde Mercado Pago (Tus integraciones > tu aplicación > Credenciales > Credenciales de prueba)."
    );
  }

  if (!client) {
    client = new MercadoPagoConfig({ accessToken });
  }

  return client;
}

export function getPreferenceClient(): Preference {
  return new Preference(getClient());
}

export function getPaymentClient(): Payment {
  return new Payment(getClient());
}
