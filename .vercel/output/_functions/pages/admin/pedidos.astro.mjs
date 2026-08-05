import { e as createComponent, l as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_GIjp7FI6.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_V45Ziw8Z.mjs';
import { a as actions } from '../../chunks/virtual_VfsNPsmb.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const result = Astro2.getActionResult(actions.orders.markShipped);
  const { data: orders, error } = await Astro2.locals.supabase.from("orders").select("id, email, total, estado_pago, estado_envio, numero_seguimiento, created_at").order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pedidos \u2014 Panel Lester" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-display text-2xl uppercase tracking-wide text-bone">Pedidos</h1> <p class="mt-1 text-sm text-bone/50"> ${orders?.length ?? 0} pedido${orders?.length === 1 ? "" : "s"} </p> ${error && renderTemplate`<p class="mt-6 text-sm text-ember">Error cargando pedidos: ${error.message}</p>`}${result?.error && renderTemplate`<p class="mt-6 text-sm text-ember">${result.error.message}</p>`}<div class="mt-6 overflow-x-auto border border-white/10"> <table class="w-full min-w-[760px] text-left text-sm"> <thead> <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-bone/50"> <th class="px-4 py-3 font-medium">Pedido</th> <th class="px-4 py-3 font-medium">Cliente</th> <th class="px-4 py-3 font-medium">Total</th> <th class="px-4 py-3 font-medium">Pago</th> <th class="px-4 py-3 font-medium">Envío</th> <th class="px-4 py-3 font-medium">Marcar como enviado</th> </tr> </thead> <tbody> ${(orders ?? []).map((o) => renderTemplate`<tr class="border-b border-white/5 align-top last:border-b-0"> <td class="px-4 py-3 text-bone/70"> <span class="font-mono text-xs">${String(o.id).slice(0, 8)}</span> <p class="mt-0.5 text-xs text-bone/40">${new Date(o.created_at).toLocaleDateString("es-AR")}</p> </td> <td class="px-4 py-3 text-bone/80">${o.email}</td> <td class="px-4 py-3 text-bone/80">$ ${Number(o.total).toLocaleString("es-AR")}</td> <td class="px-4 py-3"> <span class="bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-bone/70"> ${o.estado_pago} </span> </td> <td class="px-4 py-3"> <span${addAttribute(`px-2 py-0.5 text-[10px] uppercase tracking-wide ${o.estado_envio === "enviado" || o.estado_envio === "entregado" ? "bg-steel text-black" : "bg-white/10 text-bone/70"}`, "class")}> ${o.estado_envio} </span> ${o.numero_seguimiento && renderTemplate`<p class="mt-1 text-xs text-bone/50">Seg.: ${o.numero_seguimiento}</p>`} </td> <td class="px-4 py-3"> ${o.estado_envio === "pendiente" ? renderTemplate`<form method="POST"${addAttribute(actions.orders.markShipped, "action")} class="flex items-center gap-2"> <input type="hidden" name="id"${addAttribute(o.id, "value")}> <input type="text" name="numero_seguimiento" placeholder="N° de seguimiento" required class="w-36 border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-bone outline-none focus:border-steel"> <button type="submit" class="border border-steel px-3 py-1.5 text-[10px] uppercase tracking-widest text-steel transition-colors hover:bg-steel hover:text-black">
Enviar
</button> </form>` : renderTemplate`<span class="text-xs text-bone/40">—</span>`} </td> </tr>`)} </tbody> </table> ${(orders ?? []).length === 0 && renderTemplate`<p class="px-4 py-8 text-center text-sm text-bone/50">No hay pedidos todavía.</p>`} </div> ` })}`;
}, "E:/ecommerce2/lester/src/pages/admin/pedidos/index.astro", void 0);

const $$file = "E:/ecommerce2/lester/src/pages/admin/pedidos/index.astro";
const $$url = "/admin/pedidos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
