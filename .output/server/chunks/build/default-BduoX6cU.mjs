import { watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { a as useRoute, u as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './composables-Ceo4Raoc.mjs';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'xss';
import '../_/index2.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    let isAnalyticsLoaded = false;
    useHead({
      script: [
        {
          src: `${config.public.apiServer}/analytics/analytics.js`,
          hid: "analytics",
          type: "module",
          async: true,
          defer: true,
          // on script load
          callback: () => {
            isAnalyticsLoaded = true;
          }
        }
      ],
      htmlAttrs: {
        "lang": "en"
      }
    });
    const route = useRoute();
    function sendAnalyticsWhenReady(newRoute) {
      if (isAnalyticsLoaded) ;
      else {
        setTimeout(sendAnalyticsWhenReady, 1e3, newRoute);
      }
    }
    watch(route, async (newRoute, oldRoute) => {
      sendAnalyticsWhenReady(newRoute);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-cyber-bg min-h-screen w-full flex flex-col" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BduoX6cU.mjs.map
