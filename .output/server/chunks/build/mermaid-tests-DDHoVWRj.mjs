import { ref, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {
  __name: "mermaid-tests",
  __ssrInlineRender: true,
  setup(__props) {
    const code = ref(`
   graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
  `);
    const options = ref({
      theme: "default",
      logLevel: 3,
      securityLevel: "loose",
      block: {
        padding: 10
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MermaidComponent = resolveComponent("MermaidComponent");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Mermaid Demo</h1>`);
      _push(ssrRenderComponent(_component_MermaidComponent, {
        code: unref(code),
        options: unref(options)
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tests/mermaid-tests.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mermaid-tests-DDHoVWRj.mjs.map
