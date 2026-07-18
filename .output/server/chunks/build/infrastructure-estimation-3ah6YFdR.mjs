import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$1 = {
  __name: "SystemDesignServerEstimation",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-base-100 w-96 shadow-xl" }, _attrs))}><figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes"></figure><div class="card-body"><h2 class="card-title">Servers Required</h2><p>How many servers are required given?</p><div class="grid grid-cols-3 gap-4"><span>Daily active users(DAU)</span><input class="bg-slate-100" id="dau"><span>Millions</span><span>Average requests/user/day</span><input class="bg-slate-100" id="aur"><span>Unit</span><span>Total Requests/day</span><span id="trd"></span><span>Billion</span><span>Total Requests/second</span><span id="trs"></span><span>Thousands</span><span>Total servers required</span><span id="tsr"></span><span></span></div><div class="card-actions justify-end"><button class="btn btn-primary">Calculate</button></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/system-design/ServerEstimation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SystemDesignServerEstimation = _sfc_main$1;
  _push(ssrRenderComponent(_component_SystemDesignServerEstimation, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tests/infrastructure-estimation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const infrastructureEstimation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { infrastructureEstimation as default };
//# sourceMappingURL=infrastructure-estimation-3ah6YFdR.mjs.map
