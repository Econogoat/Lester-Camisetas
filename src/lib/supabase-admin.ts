import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la Service Role Key — ignora RLS por completo.
 *
 * Usar SOLO desde código server-side ya validado a mano (actions, endpoints
 * de API, webhooks). Nunca importar este archivo desde un componente,
 * página del lado del cliente, o cualquier <script> que corra en el
 * navegador.
 *
 * Por qué hace falta acá: un comprador invitado (sin cuenta ni sesión de
 * Supabase) no tiene auth.uid(), así que las políticas de RLS no tienen con
 * qué decidir si puede crear un pedido. La validación real (precio real,
 * stock real) la hace el código que llama a este cliente antes de escribir
 * — no RLS.
 */
let adminClient: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY (o PUBLIC_SUPABASE_URL) en el .env — hace falta para procesar pedidos y pagos."
    );
  }

  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return adminClient;
}
