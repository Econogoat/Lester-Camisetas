import { e as createComponent, l as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, o as renderSlot, n as renderScript, p as Fragment } from '../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { c as $$Heart, $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../chunks/Header_B69cff6z.mjs';
import 'clsx';
import { $ as $$ } from '../chunks/Search_ClaHZBf2.mjs';
/* empty css                                 */
import { g as getPublicProducts } from '../chunks/products-query_CqHbpmpE.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$9 = createAstro();
const $$ChevronDown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ChevronDown;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "chevron-down", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m6 9 6 6 6-6"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/ChevronDown.astro", void 0);

const $$Astro$8 = createAstro();
const $$SlidersHorizontal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SlidersHorizontal;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "sliders-horizontal", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<line x1="21" x2="14" y1="4" y2="4"></line> <line x1="10" x2="3" y1="4" y2="4"></line> <line x1="21" x2="12" y1="12" y2="12"></line> <line x1="8" x2="3" y1="12" y2="12"></line> <line x1="21" x2="16" y1="20" y2="20"></line> <line x1="12" x2="3" y1="20" y2="20"></line> <line x1="14" x2="14" y1="2" y2="6"></line> <line x1="8" x2="8" y1="10" y2="14"></line> <line x1="16" x2="16" y1="18" y2="22"></line> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/SlidersHorizontal.astro", void 0);

const $$Astro$7 = createAstro();
const $$X = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$X;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "x", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/X.astro", void 0);

const $$Astro$6 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Hero;
  const { imgUrl = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1600&q=80" } = Astro2.props;
  const hasRealImage = !imgUrl.startsWith("[");
  return renderTemplate`${maybeRenderHead()}<section class="grain relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-ink-raised"> ${hasRealImage ? renderTemplate`<img${addAttribute(imgUrl, "src")} alt="" class="absolute inset-0 h-full w-full object-cover object-center">` : renderTemplate`<div class="absolute inset-0" style="background: radial-gradient(120% 90% at 15% 20%, rgba(201,205,211,0.16), transparent 55%), linear-gradient(120deg, #0B0B0C 0%, #141416 55%, #0B0B0C 100%);"></div>`} <div class="absolute inset-0 bg-black/35"></div> <div class="relative flex h-full items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16"> <div class="animate-fade-up" style="--delay: 80ms;"> <h1 class="font-display max-w-3xl text-left text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.95] text-bone drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
No es merchandising.<br>Es patrimonio.
</h1> <a href="#catalogo" class="font-inter mt-6 inline-block border border-bone/30 px-5 py-2.5 text-xs uppercase tracking-widest text-bone transition-colors hover:border-steel hover:text-steel">
Ver colección
</a> </div> </div> </section>`;
}, "E:/ecommerce2/lester/src/components/Hero.astro", void 0);

const $$Astro$5 = createAstro();
const $$FilterSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$FilterSection;
  const { title, open = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<details class="group border-b border-white/10 py-4"${addAttribute(open, "open")}> <summary class="font-inter flex cursor-pointer list-none items-center justify-between text-sm uppercase tracking-wider text-bone [&::-webkit-details-marker]:hidden"> ${title} ${renderComponent($$result, "ChevronDown", $$ChevronDown, { "class": "h-4 w-4 text-bone/50 transition-transform duration-200 group-open:rotate-180", "strokeWidth": 2, "aria-hidden": "true" })} </summary> <div class="pt-4"> ${renderSlot($$result, $$slots["default"])} </div> </details>`;
}, "E:/ecommerce2/lester/src/components/FilterSection.astro", void 0);

const $$Astro$4 = createAstro();
const $$FiltersPanel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FiltersPanel;
  const { products } = Astro2.props;
  const countBy = (getKey) => {
    const map = /* @__PURE__ */ new Map();
    for (const p of products) {
      const key = getKey(p);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  };
  const clubs = countBy((p) => p.club);
  const ligas = countBy((p) => p.liga);
  const temporadaCounts = countBy((p) => p.temporada);
  const temporadas = [...temporadaCounts].sort(([a], [b]) => {
    if (a === "retro") return 1;
    if (b === "retro") return -1;
    return b.localeCompare(a);
  });
  const tipos = [{ value: "Local" }, { value: "Visitante" }, { value: "Alternativa" }];
  const versiones = [{ value: "Jugador" }, { value: "Aficionado" }];
  const tallas = ["S", "M", "L", "XL", "XXL"];
  const precioMin = 0;
  const maxProductPrice = products.reduce((max, p) => Math.max(max, p.price), 0);
  const precioMax = Math.max(1e4, Math.ceil((maxProductPrice || 1e5) / 1e4) * 1e4);
  return renderTemplate`${maybeRenderHead()}<div class="font-inter" data-astro-cid-4wh2zip6> <div class="mb-4 flex justify-end" data-astro-cid-4wh2zip6> <button type="button" data-clear-filters class="font-inter text-[10px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-bone" data-astro-cid-4wh2zip6>
Limpiar filtros
</button> </div> ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Club / Selecci\xF3n", "open": true, "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <label class="relative mb-3 block" data-astro-cid-4wh2zip6> <input type="search" data-club-search placeholder="Buscar club o selección..." class="w-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-bone placeholder:text-bone/40 outline-none focus:border-steel" data-astro-cid-4wh2zip6> </label> <ul class="max-h-48 space-y-2 overflow-y-auto pr-1 text-sm text-bone/80" data-astro-cid-4wh2zip6> ${clubs.map(([club, count]) => renderTemplate`<li${addAttribute(club.toLowerCase(), "data-club-item")} class="flex items-center justify-between gap-2" data-astro-cid-4wh2zip6> <label class="flex items-center gap-2" data-astro-cid-4wh2zip6> <input type="checkbox" name="club"${addAttribute(club, "value")} class="h-3.5 w-3.5 accent-steel" data-astro-cid-4wh2zip6> <span data-astro-cid-4wh2zip6>${club}</span> </label> <span class="text-xs text-bone/40" data-astro-cid-4wh2zip6>${count}</span> </li>`)} </ul> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Liga", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <ul class="space-y-2 text-sm text-bone/80" data-astro-cid-4wh2zip6> ${ligas.map(([liga, count]) => renderTemplate`<li class="flex items-center justify-between gap-2" data-astro-cid-4wh2zip6> <label class="flex items-center gap-2" data-astro-cid-4wh2zip6> <input type="checkbox" name="liga"${addAttribute(liga, "value")} class="h-3.5 w-3.5 accent-steel" data-astro-cid-4wh2zip6> <span data-astro-cid-4wh2zip6>${liga}</span> </label> <span class="text-xs text-bone/40" data-astro-cid-4wh2zip6>${count}</span> </li>`)} </ul> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Temporada", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <ul class="space-y-2 text-sm text-bone/80" data-astro-cid-4wh2zip6> ${temporadas.map(([temporada, count]) => renderTemplate`<li class="flex items-center justify-between gap-2" data-astro-cid-4wh2zip6> <label class="flex items-center gap-2 capitalize" data-astro-cid-4wh2zip6> <input type="checkbox" name="temporada"${addAttribute(temporada, "value")} class="h-3.5 w-3.5 accent-steel" data-astro-cid-4wh2zip6> <span data-astro-cid-4wh2zip6>${temporada}</span> </label> <span class="text-xs text-bone/40" data-astro-cid-4wh2zip6>${count}</span> </li>`)} </ul> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Tipo", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <ul class="space-y-2 text-sm text-bone/80" data-astro-cid-4wh2zip6> ${tipos.map(({ value }) => renderTemplate`<li data-astro-cid-4wh2zip6> <label class="flex items-center gap-2" data-astro-cid-4wh2zip6> <input type="checkbox" name="tipo"${addAttribute(value, "value")} class="h-3.5 w-3.5 accent-steel" data-astro-cid-4wh2zip6> <span data-astro-cid-4wh2zip6>${value}</span> </label> </li>`)} </ul> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Versi\xF3n", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <ul class="space-y-2 text-sm text-bone/80" data-astro-cid-4wh2zip6> ${versiones.map(({ value }) => renderTemplate`<li data-astro-cid-4wh2zip6> <label class="flex items-center gap-2" data-astro-cid-4wh2zip6> <input type="checkbox" name="version"${addAttribute(value, "value")} class="h-3.5 w-3.5 accent-steel" data-astro-cid-4wh2zip6> <span data-astro-cid-4wh2zip6>${value}</span> </label> </li>`)} </ul> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Talla", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <div class="grid grid-cols-5 gap-2" data-astro-cid-4wh2zip6> ${tallas.map((talla) => renderTemplate`<button type="button" data-talla-option class="border border-white/15 py-2 text-xs text-bone/70 transition-colors hover:border-steel hover:text-bone aria-pressed:border-steel aria-pressed:bg-steel aria-pressed:text-black" aria-pressed="false" data-astro-cid-4wh2zip6> ${talla} </button>`)} </div> ` })} ${renderComponent($$result, "FilterSection", $$FilterSection, { "title": "Precio", "data-astro-cid-4wh2zip6": true }, { "default": ($$result2) => renderTemplate` <div class="px-1" data-price-range${addAttribute(precioMin, "data-min")}${addAttribute(precioMax, "data-max")} data-astro-cid-4wh2zip6> <div class="relative h-1 bg-white/10" data-astro-cid-4wh2zip6> <div data-price-track class="absolute h-1 bg-steel" data-astro-cid-4wh2zip6></div> </div> <div class="relative" data-astro-cid-4wh2zip6> <input type="range" data-price-min${addAttribute(precioMin, "min")}${addAttribute(precioMax, "max")} step="1000"${addAttribute(precioMin, "value")} class="price-thumb pointer-events-none absolute -top-3 h-1 w-full appearance-none bg-transparent" data-astro-cid-4wh2zip6> <input type="range" data-price-max${addAttribute(precioMin, "min")}${addAttribute(precioMax, "max")} step="1000"${addAttribute(precioMax, "value")} class="price-thumb pointer-events-none absolute -top-3 h-1 w-full appearance-none bg-transparent" data-astro-cid-4wh2zip6> </div> <div class="mt-4 flex items-center justify-between text-xs text-bone/60" data-astro-cid-4wh2zip6> <span data-price-min-label data-astro-cid-4wh2zip6>$ ${precioMin.toLocaleString("es-AR")}</span> <span data-price-max-label data-astro-cid-4wh2zip6>$ ${precioMax.toLocaleString("es-AR")}</span> </div> </div> ` })} </div>  ${renderScript($$result, "E:/ecommerce2/lester/src/components/FiltersPanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/FiltersPanel.astro", void 0);

const $$Astro$3 = createAstro();
const $$FiltersSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FiltersSidebar;
  const { products } = Astro2.props;
  return renderTemplate`<!-- Trigger — mobile / tablet -->${maybeRenderHead()}<div class="flex items-center justify-between px-6 py-4 sm:px-10 lg:hidden"> <button type="button" data-filters-open class="font-inter flex items-center gap-2 border border-white/15 px-4 py-2 text-xs uppercase tracking-widest text-bone/80 transition-colors hover:border-steel hover:text-bone"> ${renderComponent($$result, "SlidersHorizontal", $$SlidersHorizontal, { "class": "h-4 w-4", "strokeWidth": 1.75, "aria-hidden": "true" })}
Filtros
</button> </div> <!-- Sidebar — desktop --> <aside class="hidden w-72 shrink-0 border-r border-white/10 py-8 pr-6 lg:block lg:pl-16"> ${renderComponent($$result, "FiltersPanel", $$FiltersPanel, { "products": products })} </aside> <!-- Drawer — mobile / tablet --> <div data-filters-drawer class="pointer-events-none fixed inset-0 z-50 lg:hidden" aria-hidden="true"> <div data-filters-overlay class="absolute inset-0 bg-black/90 opacity-0 transition-opacity duration-300"></div> <div data-filters-panel class="absolute inset-y-0 left-0 flex w-[85%] max-w-sm -translate-x-full flex-col bg-ink transition-transform duration-300 ease-editorial"> <div class="flex items-center justify-between border-b border-white/10 px-6 py-5"> <p class="font-inter text-xs uppercase tracking-widest text-bone/70">Filtros</p> <button type="button" data-filters-close aria-label="Cerrar filtros" class="text-bone/70 hover:text-bone"> ${renderComponent($$result, "X", $$X, { "class": "h-5 w-5", "strokeWidth": 1.75, "aria-hidden": "true" })} </button> </div> <div class="flex-1 overflow-y-auto px-6 py-4"> ${renderComponent($$result, "FiltersPanel", $$FiltersPanel, { "products": products })} </div> </div> </div> ${renderScript($$result, "E:/ecommerce2/lester/src/components/FiltersSidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/FiltersSidebar.astro", void 0);

const $$Astro$2 = createAstro();
const $$BreadcrumbResults = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BreadcrumbResults;
  const { count } = Astro2.props;
  const sortOptions = [
    "Relevancia",
    "Precio: menor a mayor",
    "Precio: mayor a menor",
    "M\xE1s nuevo primero"
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-4 border-b border-white/10 px-6 pb-4 pt-8 sm:px-10 sm:flex-row sm:items-end sm:justify-between lg:pl-10 lg:pr-16"> <div> <p class="font-inter text-xs uppercase tracking-widest text-bone/50"> <a href="/" class="hover:text-bone/80">Home</a> <span class="mx-1.5 text-bone/30">/</span> <span class="text-bone/70">Camisetas</span> </p> <p class="font-inter mt-1.5 text-sm text-bone/60" data-results-count>${count} camisetas encontradas</p> </div> <div class="flex items-center gap-5"> <!-- Selector de orden --> <details class="group relative"> <summary class="font-inter flex cursor-pointer list-none items-center gap-1.5 text-xs uppercase tracking-widest text-bone/70 [&::-webkit-details-marker]:hidden hover:text-bone"> <span data-sort-label>Relevancia</span> ${renderComponent($$result, "ChevronDown", $$ChevronDown, { "class": "h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180", "strokeWidth": 2, "aria-hidden": "true" })} </summary> <ul data-sort-list class="font-inter absolute right-0 top-full z-20 mt-2 w-56 border border-white/10 bg-ink-raised py-1 text-xs uppercase tracking-wide text-bone/70 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"> ${sortOptions.map((option) => renderTemplate`<li> <button type="button" data-sort-option${addAttribute(option.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""), "data-sort-value")} class="block w-full px-4 py-2.5 text-left transition-colors hover:bg-white/5 hover:text-bone"> ${option} </button> </li>`)} </ul> </details> <!-- Toggle vista lista / grid --> <div class="flex items-center gap-1 border border-white/10"> <button type="button" data-view-toggle="grid" aria-label="Vista en grilla" aria-pressed="true" class="grid h-8 w-8 place-items-center bg-steel text-black transition-colors"> <span class="grid grid-cols-2 gap-[3px]"> <span class="h-[5px] w-[5px] bg-current"></span> <span class="h-[5px] w-[5px] bg-current"></span> <span class="h-[5px] w-[5px] bg-current"></span> <span class="h-[5px] w-[5px] bg-current"></span> </span> </button> <button type="button" data-view-toggle="list" aria-label="Vista en lista" aria-pressed="false" class="grid h-8 w-8 place-items-center text-bone/60 transition-colors hover:text-bone"> <span class="flex flex-col gap-[3px]"> <span class="h-[2px] w-4 bg-current"></span> <span class="h-[2px] w-4 bg-current"></span> <span class="h-[2px] w-4 bg-current"></span> </span> </button> </div> </div> </div> ${renderScript($$result, "E:/ecommerce2/lester/src/components/BreadcrumbResults.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/BreadcrumbResults.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product, delay = 0 } = Astro2.props;
  const hasRealImages = !product.imgFront.startsWith("[");
  const priceLabel = `$ ${product.price.toLocaleString("es-AR")}`;
  return renderTemplate`${maybeRenderHead()}<article class="group animate-fade-up" data-product-card${addAttribute(product.id, "data-product-id")}${addAttribute(product.club, "data-product-club")}${addAttribute(product.liga, "data-product-liga")}${addAttribute(product.temporada, "data-product-temporada")}${addAttribute(product.tipo, "data-product-tipo")}${addAttribute(product.version, "data-product-version")}${addAttribute(String(product.price), "data-product-price")}${addAttribute(product.tallas.join(","), "data-product-tallas")}${addAttribute(product.name, "data-product-name")}${addAttribute(`--delay: ${delay}ms;`, "style")}> <div class="grain relative aspect-[4/5] overflow-hidden bg-ink-raised transition-transform duration-300 ease-editorial group-hover:scale-[1.02]"> ${hasRealImages ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <img${addAttribute(product.imgFront, "src")}${addAttribute(`${product.club} \u2014 ${product.name}, frente`, "alt")} class="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"> <img${addAttribute(product.imgBack, "src")}${addAttribute(`${product.club} \u2014 ${product.name}, espalda`, "alt")} class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"> ` })}` : renderTemplate`<div class="absolute inset-0 flex items-center justify-center" style="background: radial-gradient(110% 80% at 30% 10%, rgba(201,205,211,0.14), transparent 55%), linear-gradient(160deg, #141416 0%, #0B0B0C 100%);"> <span class="font-display text-6xl tracking-wide text-bone/10">${product.crest}</span> </div>`} ${product.badge && renderTemplate`<span class="font-inter absolute left-0 top-0 bg-steel px-2.5 py-1 text-[10px] uppercase tracking-wide text-black"> ${product.badge} </span>`} <button type="button" data-wishlist-toggle${addAttribute(product.id, "data-product-id")} aria-label="Agregar a favoritos" class="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center bg-black/50 text-bone opacity-100 backdrop-blur-sm transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"> ${renderComponent($$result, "Heart", $$Heart, { "class": "h-4 w-4", "strokeWidth": 1.75, "aria-hidden": "true" })} </button> ${product.tallas.length > 0 ? renderTemplate`<div class="absolute bottom-2.5 left-2.5" data-cart-control> <button type="button" data-cart-add aria-label="Agregar al carrito" class="flex h-8 w-8 items-center justify-center border border-white/10 bg-black/50 text-bone backdrop-blur-sm transition-colors hover:border-steel hover:text-steel"> <span class="text-xs font-bold">+</span> </button> <div data-size-picker class="pointer-events-none absolute bottom-10 left-0 z-10 flex gap-1 border border-white/10 bg-black/90 p-1.5 opacity-0 transition-opacity duration-150"> ${product.tallas.map((talla) => renderTemplate`<button type="button"${addAttribute(talla, "data-size-option")} class="font-inter h-7 w-9 border border-white/15 text-[11px] text-bone/80 transition-colors hover:border-steel hover:text-steel"> ${talla} </button>`)} </div> </div>` : renderTemplate`<span class="absolute bottom-2.5 left-2.5 flex h-8 items-center border border-white/10 bg-black/50 px-2 text-[10px] uppercase tracking-wide text-bone/40 backdrop-blur-sm">
Sin stock
</span>`} <span class="font-inter absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center border border-white/20 bg-black/50 text-[9px] font-semibold uppercase tracking-tight text-bone/80 backdrop-blur-sm" aria-hidden="true"> ${product.crest} </span> </div> <div class="pt-3"> <p class="font-inter text-xs uppercase tracking-wide text-white/60">${product.club}</p> <h3 class="font-inter mt-0.5 font-medium text-bone">${product.name}</h3> <div class="mt-1.5 flex items-center justify-between"> <p class="font-inter font-bold text-bone">${priceLabel}</p> ${Boolean(product.unidadesRestantes) && renderTemplate`<p class="font-inter text-xs text-ember">Últimas ${product.unidadesRestantes} unidades</p>`} ${product.agotado && renderTemplate`<p class="font-inter text-xs text-ember">Agotado</p>`} </div> </div> </article> ${renderScript($$result, "E:/ecommerce2/lester/src/components/ProductCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/ProductCard.astro", void 0);

const $$Astro = createAstro();
const $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductGrid;
  const { products } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="catalogo" data-catalog-grid class="grid grid-cols-1 gap-x-6 gap-y-10 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:pl-10 lg:pr-16"> ${products.map((product, i) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product, "delay": i % 3 * 90 })}`)} </div> ${renderScript($$result, "E:/ecommerce2/lester/src/components/ProductGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/components/ProductGrid.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getPublicProducts();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, { "wishlistCount": 0, "cartCount": 0 })} ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<div class="lg:flex"> ${renderComponent($$result2, "FiltersSidebar", $$FiltersSidebar, { "products": products })} <div class="min-w-0 flex-1"> ${renderComponent($$result2, "BreadcrumbResults", $$BreadcrumbResults, { "count": products.length })} ${renderComponent($$result2, "ProductGrid", $$ProductGrid, { "products": products })} </div> </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/index.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
