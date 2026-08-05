import { e as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../../chunks/Header_B69cff6z.mjs';
export { renderers } from '../../renderers.mjs';

const $$Error = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "El pago no se pudo procesar \u2014 Lester" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="mx-auto max-w-lg px-6 py-20 text-center sm:px-10"> <p class="font-display text-3xl uppercase tracking-wide text-bone">El pago no se pudo procesar</p> <p class="mt-3 text-sm text-bone/60">No te preocupes, no se realizó ningún cobro. Podés volver a intentarlo.</p> <a href="/carrito" class="mt-8 inline-block border border-steel px-6 py-2.5 text-xs uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Volver al carrito
</a> </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/pedido/error.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/pedido/error.astro";
const $$url = "/pedido/error";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Error,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
