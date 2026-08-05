import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Crea un cliente de Supabase atado a las cookies de la request/response
 * actual de Astro. Usalo en middleware, páginas y actions — nunca lo
 * compartas entre requests distintos.
 *
 * Sigue el patrón oficial de Supabase para Astro:
 * https://supabase.com/docs/guides/auth/quickstarts/astrojs
 */
export function createClient({
  request,
  cookies,
}: {
  request: Request;
  cookies: AstroCookies;
}) {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Faltan PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_PUBLISHABLE_KEY. Copiá .env.example a .env y completá los valores de tu proyecto de Supabase."
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "");
      },
      setAll(
        cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]
      ) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookies.set(name, value, options)
        );
      },
    },
  });
}
