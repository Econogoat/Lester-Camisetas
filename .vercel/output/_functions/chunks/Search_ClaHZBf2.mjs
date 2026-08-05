import { e as createComponent, m as maybeRenderHead, s as spreadAttributes, g as addAttribute, o as renderSlot, r as renderTemplate, h as createAstro, l as renderComponent } from './astro/server_GIjp7FI6.mjs';
import 'piccolore';
import 'clsx';

const $$Astro$1 = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  const cls = Astro2.props.class;
  const name = Astro2.props.iconName;
  delete Astro2.props.size;
  delete Astro2.props.class;
  delete Astro2.props.iconName;
  const props = Object.assign({
    "xmlns": "http://www.w3.org/2000/svg",
    "stroke-width": 2,
    "width": size ?? 24,
    "height": size ?? 24,
    "stroke": "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "viewBox": "0 0 24 24"
  }, Astro2.props);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(["lucide", { [`lucide-${name}`]: name }, cls], "class:list")}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/.Layout.astro", void 0);

const $$Astro = createAstro();
const $$Search = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "search", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="11" cy="11" r="8"></circle> <path d="m21 21-4.3-4.3"></path> ` })}`;
}, "E:/ecommerce2/lester/node_modules/lucide-astro/dist/Search.astro", void 0);

export { $$ as $, $$Search as a };
