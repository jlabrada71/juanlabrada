import { _ as __nuxt_component_0 } from './nuxt-link-BCVcy1vF.mjs';
import { ref, unref, mergeProps, withCtx, createTextVNode, createBlock, renderSlot, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main$2 = {
  __name: "ViewMoreButton",
  __ssrInlineRender: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14"${_scopeId}><path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"${_scopeId}></path></svg>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`View more`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [(openBlock(), createBlock("svg", {
              class: "me-2 h-3 w-3",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              viewBox: "0 0 20 14"
            }, [createVNode("path", {
              d: "M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
            })])), renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode("View more")])];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ViewMoreButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, {
    emit: __emit
  }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ViewMoreButton = _sfc_main$2;
      if (props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          role: "alert",
          class: "alert alert-info"
        }, _attrs))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert"><div class="flex items-center"><svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path></svg><span class="sr-only">Info</span><h3 class="text-lg font-medium">${ssrInterpolate(props.title)}</h3></div><div class="mt-2 mb-4 text-sm">${ssrInterpolate(props.message)}</div><div class="flex">`);
        _push(ssrRenderComponent(_component_ViewMoreButton, {
          to: "/contact"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Contact me`);
            } else {
              return [createTextVNode("Contact me")];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button type="button" class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" aria-label="Close"> Dismiss </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/daisyui/Alert.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "daisy-test",
  __ssrInlineRender: true,
  setup(__props) {
    const message = ref("This is a simple alert");
    const title = ref("This is a simple title");
    const showMessage = ref(false);
    function hide() {
      showMessage.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Alert = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Alert, {
        title: unref(title),
        message: unref(message),
        show: unref(showMessage),
        onClose: hide
      }, null, _parent));
      _push(`<div class="flex flex-row gap-5"><button class="bg-red-500 border border-2 p-4">Show</button><button class="bg-red-500 border border-2 p-4 hover:bg-slate-100">Hide</button></div><input type="text"${ssrRenderAttr("value", unref(message))}><div role="alert" class="alert alert-info"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>New software update available.</span></div><div role="alert" class="alert"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>we use cookies for no reason.</span><div><button class="btn btn-sm">Deny</button><button class="btn btn-sm btn-primary">Accept</button></div></div><div role="alert" class="alert shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><h3 class="font-bold">New message!</h3><div class="text-xs">You have 1 unread message</div></div><button class="btn btn-sm">See</button></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tests/daisy-test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=daisy-test-Cns3UgBC.mjs.map
