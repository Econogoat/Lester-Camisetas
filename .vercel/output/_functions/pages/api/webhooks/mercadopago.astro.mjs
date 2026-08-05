import 'mercadopago';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, url }) => {
  url.searchParams.get("data.id") ?? url.searchParams.get("id");
  request.headers.get("x-signature");
  request.headers.get("x-request-id");
  {
    return new Response(null, { status: 401 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
