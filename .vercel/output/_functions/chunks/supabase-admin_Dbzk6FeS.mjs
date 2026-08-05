import { Payment, MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

let client = null;
function getClient() {
  const accessToken = "APP_USR-8060206102510813-080417-ebcf65045a73fc21b08ed386d6b30dad-3592087116";
  if (!client) {
    client = new MercadoPagoConfig({ accessToken });
  }
  return client;
}
function getPreferenceClient() {
  return new Preference(getClient());
}
function getPaymentClient() {
  return new Payment(getClient());
}

let adminClient = null;
function getAdminClient() {
  const url = "https://nolxnosvxwworggacqxb.supabase.co";
  const serviceRoleKey = "sb_secret_gRmidQ9NgW5P3BMZvzpCpg_8wvRW22e";
  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return adminClient;
}

export { getAdminClient as a, getPreferenceClient as b, getPaymentClient as g };
