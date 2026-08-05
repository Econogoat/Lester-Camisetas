import { e as createComponent, k as renderHead, g as addAttribute, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
import { a as actions } from '../../chunks/virtual_VfsNPsmb.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.locals.profile?.role === "admin") {
    return Astro2.redirect("/admin/productos");
  }
  const result = Astro2.getActionResult(actions.auth.signIn);
  if (result && !result.error) {
    return Astro2.redirect("/admin/productos");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="robots" content="noindex"><title>Ingresar — Panel Lester</title>${renderHead()}</head> <body class="flex min-h-screen items-center justify-center bg-ink px-6 font-inter text-bone"> <div class="w-full max-w-sm"> <p class="font-display text-center text-2xl uppercase tracking-wider text-bone">Lester</p> <p class="mt-1 text-center text-xs uppercase tracking-widest text-bone/40">Panel de administración</p> <form method="POST"${addAttribute(actions.auth.signIn, "action")} class="mt-8 space-y-4"> <div> <label for="email" class="block text-xs uppercase tracking-widest text-bone/60">Email</label> <input id="email" name="email" type="email" required autocomplete="username" class="mt-1.5 w-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-bone outline-none focus:border-steel"> </div> <div> <label for="password" class="block text-xs uppercase tracking-widest text-bone/60">Contraseña</label> <input id="password" name="password" type="password" required autocomplete="current-password" class="mt-1.5 w-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-bone outline-none focus:border-steel"> </div> ${result?.error && renderTemplate`<p class="text-xs text-ember">${result.error.message}</p>`} <button type="submit" class="w-full border border-steel bg-steel py-2.5 text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-90">
Ingresar
</button> </form> <p class="mt-6 text-center text-xs text-bone/40">
El usuario admin se crea a mano desde el dashboard de Supabase — no hay alta pública acá.
</p> </div> </body></html>`;
}, "E:/ecommerce2/lester/src/pages/admin/login.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
