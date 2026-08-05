import { e as createComponent, l as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_V45Ziw8Z.mjs';
import { $ as $$ProductForm } from '../../../chunks/ProductForm_CoDOcBQk.mjs';
import { a as actions } from '../../../chunks/virtual_VfsNPsmb.mjs';
import { i as isInputError } from '../../../chunks/astro-designed-error-pages_CKIh0Rtv.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/admin/productos");
  }
  const updateResult = Astro2.getActionResult(actions.products.update);
  if (updateResult && !updateResult.error) {
    return Astro2.redirect("/admin/productos");
  }
  const { data: product, error } = await Astro2.locals.supabase.from("products").select(
    "id, club_seleccion, liga, temporada, tipo, version, precio, imagen_frente, imagen_espalda, activo, product_variants(talla, stock)"
  ).eq("id", id).single();
  if (error || !product) {
    return Astro2.redirect("/admin/productos");
  }
  const fieldErrors = isInputError(updateResult?.error) ? updateResult.error.fields : void 0;
  const formError = updateResult?.error && !isInputError(updateResult.error) ? updateResult.error.message : void 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Editar ${product.club_seleccion} \u2014 Panel Lester` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-display text-2xl uppercase tracking-wide text-bone">Editar producto</h1> <div class="mt-6"> ${renderComponent($$result2, "ProductForm", $$ProductForm, { "product": {
    id: product.id,
    club_seleccion: product.club_seleccion,
    liga: product.liga,
    temporada: product.temporada,
    tipo: product.tipo,
    version: product.version,
    precio: product.precio,
    imagen_frente: product.imagen_frente,
    imagen_espalda: product.imagen_espalda,
    activo: product.activo,
    variants: product.product_variants ?? []
  }, "action": actions.products.update, "fieldErrors": fieldErrors, "formError": formError })} </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/admin/productos/[id].astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/admin/productos/[id].astro";
const $$url = "/admin/productos/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
