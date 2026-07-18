import { resolveComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ValidationExample1 = resolveComponent("ValidationExample1");
  const _component_ValidationExampleSchemaValidation = resolveComponent("ValidationExampleSchemaValidation");
  const _component_ValidationExampleCompositionApi = resolveComponent("ValidationExampleCompositionApi");
  const _component_ValidationExampleCustomInput = resolveComponent("ValidationExampleCustomInput");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_ValidationExample1, null, null, _parent));
  _push(ssrRenderComponent(_component_ValidationExampleSchemaValidation, null, null, _parent));
  _push(ssrRenderComponent(_component_ValidationExampleCompositionApi, null, null, _parent));
  _push(ssrRenderComponent(_component_ValidationExampleCustomInput, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tests/form-validation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const formValidation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { formValidation as default };
//# sourceMappingURL=form-validation-E5ejW2vc.mjs.map
