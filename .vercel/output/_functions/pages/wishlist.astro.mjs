import { e as createComponent, r as renderTemplate, n as renderScript, u as unescapeHTML, l as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../chunks/Header_B69cff6z.mjs';
import { g as getPublicProducts } from '../chunks/products-query_CqHbpmpE.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Wishlist = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getPublicProducts();
  const catalogJson = JSON.stringify(products).replace(/</g, "\\u003c");
  return renderTemplate(_a || (_a = __template(["", ' <script type="application/json" id="catalog-data">', "<\/script> ", ""])), renderComponent($$result, "Layout", $$Layout, { "title": "Favoritos \u2014 Lester" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="mx-auto max-w-5xl px-6 py-10 sm:px-10 lg:px-16"> <h1 class="font-display text-2xl uppercase tracking-wide text-bone">Tus favoritos</h1> <div data-wishlist-empty class="mt-10 hidden text-center"> <p class="text-sm text-bone/60">Todavía no marcaste ninguna camiseta como favorita.</p> <a href="/" class="mt-4 inline-block border border-steel px-5 py-2.5 text-xs uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Ver catálogo
</a> </div> <div data-wishlist-items class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"></div> </div> ` }), unescapeHTML(catalogJson), renderScript($$result, "E:/ecommerce2/lester/src/pages/wishlist.astro?astro&type=script&index=0&lang.ts"));
}, "E:/ecommerce2/lester/src/pages/wishlist.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/wishlist.astro";
const $$url = "/wishlist";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Wishlist,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
