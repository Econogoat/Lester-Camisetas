import { e as createComponent, l as renderComponent, m as maybeRenderHead, r as renderTemplate, h as createAstro, n as renderScript, g as addAttribute } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_V45Ziw8Z.mjs';
import { a as actions } from '../../chunks/virtual_VfsNPsmb.mjs';
import { $ as $$, a as $$Search } from '../../chunks/Search_ClaHZBf2.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$Pencil = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Pencil;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "pencil", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path> <path d="m15 5 4 4"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/Pencil.astro", void 0);

const $$Astro$2 = createAstro();
const $$Plus = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Plus;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "plus", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M5 12h14"></path> <path d="M12 5v14"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/Plus.astro", void 0);

const $$Astro$1 = createAstro();
const $$Trash2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Trash2;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "trash-2", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M3 6h18"></path> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path> <line x1="10" x2="10" y1="11" y2="17"></line> <line x1="14" x2="14" y1="11" y2="17"></line> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/Trash2.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const deleteResult = Astro2.getActionResult(actions.products.remove);
  const q = Astro2.url.searchParams.get("q")?.trim() ?? "";
  let query = Astro2.locals.supabase.from("products").select(
    "id, club_seleccion, liga, temporada, tipo, precio, imagen_frente, activo, product_variants(stock)"
  ).order("created_at", { ascending: false });
  if (q) {
    query = query.ilike("club_seleccion", `%${q}%`);
  }
  const { data: products, error } = await query;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos \u2014 Panel Lester" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-wrap items-center justify-between gap-4"> <div> <h1 class="font-display text-2xl uppercase tracking-wide text-bone">Productos</h1> <p class="mt-1 text-sm text-bone/50"> ${products?.length ?? 0} producto${products?.length === 1 ? "" : "s"} </p> </div> <a href="/admin/productos/nuevo" class="font-inter flex items-center gap-2 border border-steel bg-steel px-4 py-2 text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-90"> ${renderComponent($$result2, "Plus", $$Plus, { "class": "h-4 w-4", "strokeWidth": 2, "aria-hidden": "true" })}
Nuevo producto
</a> </div> <form method="GET" class="mt-6 max-w-sm"> <label class="relative flex items-center"> ${renderComponent($$result2, "Search", $$Search, { "class": "pointer-events-none absolute left-3 h-4 w-4 text-bone/40", "strokeWidth": 1.75, "aria-hidden": "true" })} <input type="search" name="q"${addAttribute(q, "value")} placeholder="Buscar por club o selección..." class="w-full border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-bone placeholder:text-bone/40 outline-none focus:border-steel"> </label> </form> ${error && renderTemplate`<p class="mt-6 text-sm text-ember">Error cargando productos: ${error.message}</p>`}${deleteResult?.error && renderTemplate`<p class="mt-6 text-sm text-ember">${deleteResult.error.message}</p>`}<div class="mt-6 overflow-x-auto border border-white/10"> <table class="w-full min-w-[720px] text-left text-sm"> <thead> <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-bone/50"> <th class="px-4 py-3 font-medium">Producto</th> <th class="px-4 py-3 font-medium">Tipo</th> <th class="px-4 py-3 font-medium">Temporada</th> <th class="px-4 py-3 font-medium">Precio</th> <th class="px-4 py-3 font-medium">Stock</th> <th class="px-4 py-3 font-medium">Estado</th> <th class="px-4 py-3 text-right font-medium">Acciones</th> </tr> </thead> <tbody> ${(products ?? []).map((p) => {
    const stock = (p.product_variants ?? []).reduce(
      (sum, v) => sum + v.stock,
      0
    );
    return renderTemplate`<tr class="border-b border-white/5 last:border-b-0"> <td class="px-4 py-3"> <div class="flex items-center gap-3"> <div class="h-10 w-10 shrink-0 overflow-hidden bg-ink-raised"> ${p.imagen_frente && renderTemplate`<img${addAttribute(p.imagen_frente, "src")} alt="" class="h-full w-full object-cover">`} </div> <div> <p class="text-bone">${p.club_seleccion}</p> <p class="text-xs text-bone/50">${p.liga}</p> </div> </div> </td> <td class="px-4 py-3 capitalize text-bone/80">${p.tipo}</td> <td class="px-4 py-3 text-bone/80">${p.temporada}</td> <td class="px-4 py-3 text-bone/80">$ ${Number(p.precio).toLocaleString("es-AR")}</td> <td class="px-4 py-3 text-bone/80">${stock}</td> <td class="px-4 py-3"> <span${addAttribute(`px-2 py-0.5 text-[10px] uppercase tracking-wide ${p.activo ? "bg-steel text-black" : "bg-white/10 text-bone/50"}`, "class")}> ${p.activo ? "Activo" : "Oculto"} </span> </td> <td class="px-4 py-3"> <div class="flex items-center justify-end gap-3"> <a${addAttribute(`/admin/productos/${p.id}`, "href")} aria-label="Editar" class="text-bone/60 hover:text-bone"> ${renderComponent($$result2, "Pencil", $$Pencil, { "class": "h-4 w-4", "strokeWidth": 1.75, "aria-hidden": "true" })} </a> <form method="POST"${addAttribute(actions.products.remove, "action")} data-confirm="¿Eliminar este producto? Esta acción no se puede deshacer."> <input type="hidden" name="id"${addAttribute(p.id, "value")}> <button type="submit" aria-label="Eliminar" class="text-bone/60 hover:text-ember"> ${renderComponent($$result2, "Trash2", $$Trash2, { "class": "h-4 w-4", "strokeWidth": 1.75, "aria-hidden": "true" })} </button> </form> </div> </td> </tr>`;
  })} </tbody> </table> ${(products ?? []).length === 0 && renderTemplate`<p class="px-4 py-8 text-center text-sm text-bone/50">No hay productos todavía.</p>`} </div> ` })} ${renderScript($$result, "E:/ecommerce2/lester/src/pages/admin/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/ecommerce2/lester/src/pages/admin/productos/index.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/admin/productos/index.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
