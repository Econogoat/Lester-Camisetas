import { e as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$UtilityBar, b as $$Header } from '../../chunks/Header_B69cff6z.mjs';
export { renderers } from '../../renderers.mjs';

const $$Pendiente = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pago pendiente \u2014 Lester" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UtilityBar", $$UtilityBar, {})} ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<div class="mx-auto max-w-lg px-6 py-20 text-center sm:px-10"> <p class="font-display text-3xl uppercase tracking-wide text-bone">Tu pago está pendiente</p> <p class="mt-3 text-sm text-bone/60">
Esto pasa con algunos medios de pago (como pago en efectivo) que tardan en confirmarse. Te vamos a avisar por
      email apenas se acredite.
</p> <a href="/" class="mt-8 inline-block border border-steel px-6 py-2.5 text-xs uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Volver a la tienda
</a> </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/pedido/pendiente.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/pedido/pendiente.astro";
const $$url = "/pedido/pendiente";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pendiente,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
