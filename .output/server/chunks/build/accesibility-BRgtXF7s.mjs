import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-96 bg-slate-100 p-4 flex gap-1" }, _attrs))}><div class="max-h-8 w-8 h-8 bg-slate-200"></div><div class="w-6 h-6 bg-slate-200"></div><div class="w-5 h-5 bg-slate-200"></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tests/accesibility.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accesibility = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { accesibility as default };
//# sourceMappingURL=accesibility-BRgtXF7s.mjs.map
