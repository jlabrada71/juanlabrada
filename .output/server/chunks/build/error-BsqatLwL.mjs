import { _ as __nuxt_component_0 } from './nuxt-link-BJMI_ZTQ.mjs';
import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, createBlock, createVNode, openBlock, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'xss';
import './server.mjs';
import 'vue-router';

const _sfc_main = {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_app = resolveComponent("v-app");
  const _component_NuxtLink = __nuxt_component_0;
  _push(ssrRenderComponent(_component_v_app, mergeProps({
    dark: ""
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($props.error.statusCode === 404) {
          _push2(`<h1 data-v-35790e83${_scopeId}>${ssrInterpolate($data.pageNotFound)}</h1>`);
        } else {
          _push2(`<h1 data-v-35790e83${_scopeId}>${ssrInterpolate($data.otherError)}</h1>`);
        }
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "/"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Home page `);
            } else {
              return [createTextVNode(" Home page ")];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [$props.error.statusCode === 404 ? (openBlock(), createBlock("h1", {
          key: 0
        }, toDisplayString($data.pageNotFound), 1)) : (openBlock(), createBlock("h1", {
          key: 1
        }, toDisplayString($data.otherError), 1)), createVNode(_component_NuxtLink, {
          to: "/"
        }, {
          default: withCtx(() => [createTextVNode(" Home page ")]),
          _: 1
        })];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-35790e83"]]);

export { error as default };
//# sourceMappingURL=error-BsqatLwL.mjs.map
