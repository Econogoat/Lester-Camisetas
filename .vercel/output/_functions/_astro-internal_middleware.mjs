import { e as defineMiddleware, s as sequence } from './chunks/server_B34kQgrm.mjs';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CKIh0Rtv.mjs';
import 'piccolore';
import './chunks/astro/server_GIjp7FI6.mjs';
import 'clsx';

const supabaseUrl = "https://nolxnosvxwworggacqxb.supabase.co";
const supabasePublishableKey = "sb_publishable_0OUSgtp38bgRImsCCA7v4w_DKl036PJ";
function createClient({
  request,
  cookies
}) {
  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(
          ({ name, value, options }) => cookies.set(name, value, options)
        );
      }
    }
  });
}

const onRequest$1 = defineMiddleware(async (context, next) => {
  const supabase = createClient({
    request: context.request,
    cookies: context.cookies
  });
  context.locals.supabase = supabase;
  const {
    data: { user }
  } = await supabase.auth.getUser();
  context.locals.user = user ?? null;
  context.locals.profile = null;
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("id, role, created_at").eq("id", user.id).single();
    context.locals.profile = profile ?? null;
  }
  const { pathname } = context.url;
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdmin = context.locals.profile?.role === "admin";
  if (isAdminRoute && !isAdmin) {
    return context.redirect("/admin/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
