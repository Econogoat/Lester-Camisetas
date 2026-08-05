import { e as createComponent, k as renderHead, g as addAttribute, r as renderTemplate, o as renderSlot, n as renderScript, h as createAstro } from './astro/server_GIjp7FI6.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Panel \u2014 Lester" } = Astro2.props;
  const userEmail = Astro2.locals.user?.email ?? "";
  const pathname = Astro2.url.pathname;
  const navItems = [
    { href: "/admin/productos", label: "Productos" },
    { href: "/admin/pedidos", label: "Pedidos" }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="robots" content="noindex"><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-ink font-inter text-bone"> <div class="flex min-h-screen flex-col lg:flex-row"> <aside class="flex shrink-0 flex-col justify-between border-b border-white/10 bg-ink-raised px-6 py-6 lg:w-60 lg:border-b-0 lg:border-r lg:py-8"> <div> <a href="/admin/productos" class="font-display block text-xl uppercase tracking-wider text-bone">
Lester
</a> <p class="mt-1 text-[11px] uppercase tracking-widest text-bone/40">Panel</p> <nav class="mt-8 flex gap-2 lg:mt-10 lg:flex-col lg:gap-1"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(pathname.startsWith(item.href) ? "page" : void 0, "aria-current")} class="px-3 py-2 text-sm text-bone/70 transition-colors hover:bg-white/5 hover:text-bone aria-[current]:bg-white/10 aria-[current]:text-bone"> ${item.label} </a>`)} </nav> </div> <div class="mt-8 border-t border-white/10 pt-4 lg:mt-0"> <p class="truncate text-xs text-bone/50">${userEmail}</p> <button type="button" id="admin-signout" class="mt-2 text-xs uppercase tracking-widest text-bone/60 transition-colors hover:text-bone">
Cerrar sesión
</button> </div> </aside> <main class="flex-1 px-6 py-8 sm:px-10 lg:px-12"> ${renderSlot($$result, $$slots["default"])} </main> </div> ${renderScript($$result, "E:/ecommerce2/lester/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "E:/ecommerce2/lester/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
