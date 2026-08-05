import { e as createComponent, l as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_V45Ziw8Z.mjs';
import { $ as $$ProductForm } from '../../../chunks/ProductForm_CoDOcBQk.mjs';
import { a as actions } from '../../../chunks/virtual_VfsNPsmb.mjs';
import { i as isInputError } from '../../../chunks/astro-designed-error-pages_CKIh0Rtv.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Nuevo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nuevo;
  const result = Astro2.getActionResult(actions.products.create);
  if (result && !result.error) {
    return Astro2.redirect("/admin/productos");
  }
  const fieldErrors = isInputError(result?.error) ? result.error.fields : void 0;
  const formError = result?.error && !isInputError(result.error) ? result.error.message : void 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuevo producto \u2014 Panel Lester" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-display text-2xl uppercase tracking-wide text-bone">Nuevo producto</h1> <div class="mt-6"> ${renderComponent($$result2, "ProductForm", $$ProductForm, { "action": actions.products.create, "fieldErrors": fieldErrors, "formError": formError })} </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/admin/productos/nuevo.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/admin/productos/nuevo.astro";
const $$url = "/admin/productos/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nuevo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
