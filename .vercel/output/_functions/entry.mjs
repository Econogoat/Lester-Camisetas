import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D97EvmoJ.mjs';
import { manifest } from './manifest_CYW51Kji.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/pedidos.astro.mjs');
const _page4 = () => import('./pages/admin/productos/nuevo.astro.mjs');
const _page5 = () => import('./pages/admin/productos/_id_.astro.mjs');
const _page6 = () => import('./pages/admin/productos.astro.mjs');
const _page7 = () => import('./pages/admin.astro.mjs');
const _page8 = () => import('./pages/api/webhooks/mercadopago.astro.mjs');
const _page9 = () => import('./pages/carrito.astro.mjs');
const _page10 = () => import('./pages/pedido/error.astro.mjs');
const _page11 = () => import('./pages/pedido/exito.astro.mjs');
const _page12 = () => import('./pages/pedido/pendiente.astro.mjs');
const _page13 = () => import('./pages/wishlist.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/pedidos/index.astro", _page3],
    ["src/pages/admin/productos/nuevo.astro", _page4],
    ["src/pages/admin/productos/[id].astro", _page5],
    ["src/pages/admin/productos/index.astro", _page6],
    ["src/pages/admin/index.astro", _page7],
    ["src/pages/api/webhooks/mercadopago.ts", _page8],
    ["src/pages/carrito.astro", _page9],
    ["src/pages/pedido/error.astro", _page10],
    ["src/pages/pedido/exito.astro", _page11],
    ["src/pages/pedido/pendiente.astro", _page12],
    ["src/pages/wishlist.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "00f5c2b4-e961-453c-84ca-480aef2fc5eb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
