/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type SupabaseClient = import("@supabase/supabase-js").SupabaseClient;
type SupabaseUser = import("@supabase/supabase-js").User;

type Profile = {
  id: string;
  role: "admin" | "customer";
  created_at: string;
};

declare namespace App {
  interface Locals {
    /** Cliente de Supabase atado a la request actual (respeta RLS vía la sesión del usuario). */
    supabase: SupabaseClient;
    /** Usuario autenticado de Supabase Auth, o null si no hay sesión. */
    user: SupabaseUser | null;
    /** Fila de `profiles` del usuario autenticado, o null si no hay sesión / no tiene fila todavía. */
    profile: Profile | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY?: string;
  readonly MP_ACCESS_TOKEN?: string;
  readonly MP_WEBHOOK_SECRET?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

