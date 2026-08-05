import { e as createComponent, r as renderTemplate, n as renderScript, u as unescapeHTML, l as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../chunks/Header_B69cff6z.mjs';
import { g as getPublicProducts } from '../chunks/products-query_CqHbpmpE.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Carrito = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getPublicProducts();
  const catalogJson = JSON.stringify(products).replace(/</g, "\\u003c");
  return renderTemplate(_a || (_a = __template(["", ' <script type="application/json" id="catalog-data">', "<\/script> ", ""])), renderComponent($$result, "Layout", $$Layout, { "title": "Carrito \u2014 Lester" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="mx-auto max-w-3xl px-6 py-10 sm:px-10 lg:px-16"> <h1 class="font-display text-2xl uppercase tracking-wide text-bone">Tu carrito</h1> <div data-cart-empty class="mt-10 hidden text-center"> <p class="text-sm text-bone/60">Todavía no agregaste nada al carrito.</p> <a href="/" class="mt-4 inline-block border border-steel px-5 py-2.5 text-xs uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Ver catálogo
</a> </div> <div data-cart-items class="mt-8 divide-y divide-white/10 border-t border-white/10"></div> <div data-cart-summary class="hidden"> <div class="flex items-center justify-between border-t border-white/10 pt-6"> <p class="font-inter text-sm text-bone/60">Total</p> <p class="font-display text-2xl text-bone" data-cart-total>$ 0</p> </div> <div class="mt-4"> <label for="checkout-email" class="block text-xs uppercase tracking-widest text-bone/60">Tu email</label> <input id="checkout-email" type="email" required placeholder="vos@email.com" class="mt-1.5 w-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-bone placeholder:text-bone/40 outline-none focus:border-steel"> <p data-checkout-error class="mt-2 hidden text-xs text-ember"></p> <button type="button" id="checkout-button" class="mt-3 w-full border border-steel bg-steel py-3 text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
Finalizar compra
</button> </div> </div> </div> ` }), unescapeHTML(catalogJson), renderScript($$result, "E:/ecommerce2/lester/src/pages/carrito.astro?astro&type=script&index=0&lang.ts"));
}, "E:/ecommerce2/lester/src/pages/carrito.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/carrito.astro";
const $$url = "/carrito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Carrito,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
