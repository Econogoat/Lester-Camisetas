import { e as createComponent, l as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, k as renderHead, o as renderSlot, n as renderScript } from './astro/server_GIjp7FI6.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */
import { $ as $$, a as $$Search } from './Search_ClaHZBf2.mjs';

const $$Astro$4 = createAstro();
const $$Heart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Heart;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "heart", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/Heart.astro", void 0);

const $$Astro$3 = createAstro();
const $$ShieldCheck = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ShieldCheck;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shield-check", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/ShieldCheck.astro", void 0);

const $$Astro$2 = createAstro();
const $$ShoppingBag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShoppingBag;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shopping-bag", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path> <path d="M3 6h18"></path> <path d="M16 10a4 4 0 0 1-8 0"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/ShoppingBag.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Lester \u2014 Camisetas de f\xFAtbol originales",
    description = "Curadur\xEDa experta de camisetas de clubes y selecciones nacionales. 100% originales, autenticidad verificada."
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="description"${addAttribute(description, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "E:/ecommerce2/lester/src/layouts/Layout.astro", void 0);

const $$UtilityBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-black"> <div class="mx-auto flex items-center justify-between gap-4 px-6 py-2 text-[11px] uppercase tracking-widest text-white/70 sm:px-10 lg:px-16"> <p class="hidden truncate sm:block">Envío a todo el país · Cambios sin cargo dentro de 30 días</p> <p class="flex items-center gap-1.5 font-semibold text-bone"> ${renderComponent($$result, "ShieldCheck", $$ShieldCheck, { "class": "h-3.5 w-3.5 text-steel", "strokeWidth": 2, "aria-hidden": "true" })} <span>100% Originales</span> <span class="text-steel">·</span> <span>Autenticidad Verificada</span> </p> </div> </div>`;
}, "E:/ecommerce2/lester/src/components/UtilityBar.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { wishlistCount = 0, cartCount = 0 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="border-b border-white/10 bg-ink"> <div class="flex items-center gap-4 px-6 py-5 sm:px-10 lg:px-16"> <a href="/" class="font-display shrink-0 text-2xl uppercase tracking-wider text-bone">
Lester
</a> <!-- Buscador — desktop --> <div class="mx-auto hidden w-full max-w-xl md:block"> <label class="group relative flex items-center"> ${renderComponent($$result, "Search", $$Search, { "class": "pointer-events-none absolute left-3.5 h-4 w-4 text-bone/50 group-focus-within:text-steel", "strokeWidth": 1.75, "aria-hidden": "true" })} <input type="search" name="q" placeholder="Buscar club, selección o jugador..." class="font-inter w-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-bone placeholder:text-bone/40 outline-none transition-colors focus:border-steel"> </label> </div> <div class="ml-auto flex shrink-0 items-center gap-5 md:ml-0"> <!-- Buscador — trigger mobile --> <button type="button" aria-label="Buscar" data-search-toggle class="text-bone/80 transition-colors hover:text-bone md:hidden"> ${renderComponent($$result, "Search", $$Search, { "class": "h-5 w-5", "strokeWidth": 1.75, "aria-hidden": "true" })} </button> <a href="/wishlist" aria-label="Favoritos" class="group relative text-bone/80 transition-colors hover:text-bone"> ${renderComponent($$result, "Heart", $$Heart, { "class": "h-5 w-5", "strokeWidth": 1.75, "aria-hidden": "true" })} <span data-wishlist-badge${addAttribute(`font-inter absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-steel px-1 text-[10px] font-semibold text-black ${wishlistCount > 0 ? "" : "hidden"}`, "class")}> ${wishlistCount} </span> </a> <a href="/carrito" aria-label="Carrito" class="group relative text-bone/80 transition-colors hover:text-bone"> ${renderComponent($$result, "ShoppingBag", $$ShoppingBag, { "class": "h-5 w-5", "strokeWidth": 1.75, "aria-hidden": "true" })} <span data-cart-badge${addAttribute(`font-inter absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-steel px-1 text-[10px] font-semibold text-black ${cartCount > 0 ? "" : "hidden"}`, "class")}> ${cartCount} </span> </a> </div> </div> <!-- Buscador — panel mobile, colapsado por defecto --> <div data-search-panel class="hidden border-t border-white/10 px-6 py-3 md:hidden"> <label class="group relative flex items-center"> ${renderComponent($$result, "Search", $$Search, { "class": "pointer-events-none absolute left-3.5 h-4 w-4 text-bone/50", "strokeWidth": 1.75, "aria-hidden": "true" })} <input type="search" name="q-mobile" placeholder="Buscar club, selección o jugador..." class="font-inter w-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-bone placeholder:text-bone/40 outline-none focus:border-steel"> </label> </div> </header> ${renderScript($$result, "E:/ecommerce2/lester/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/Header.astro", void 0);

export { $$Layout as $, $$UtilityBar as a, $$Header as b, $$Heart as c };
