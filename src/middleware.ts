import { defineMiddleware } from "astro:middleware";
import { createClient } from "./lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createClient({
    request: context.request,
    cookies: context.cookies,
  });

  context.locals.supabase = supabase;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  context.locals.user = user ?? null;

  context.locals.profile = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role, created_at")
      .eq("id", user.id)
      .single();
    context.locals.profile = profile ?? null;
  }

  // Proteger todo /admin/*, salvo la propia pantalla de login.
  // Esto evita mostrar pantallas que no corresponden — pero la defensa real
  // vive en las políticas de RLS (ver supabase/migrations/0002_rls.sql) y en
  // el chequeo de rol que repite cada action en src/actions/.
  const { pathname } = context.url;
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdmin = context.locals.profile?.role === "admin";

  if (isAdminRoute && !isAdmin) {
    return context.redirect("/admin/login");
  }

  return next();
});
