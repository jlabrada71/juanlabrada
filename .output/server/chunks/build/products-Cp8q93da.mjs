import { resolveComponent, defineComponent, withCtx, createTextVNode, createVNode, ref, inject, reactive, provide, mergeProps, useSSRContext } from 'vue';
import { u as useHead } from './composables-B3xdabOK.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BCVcy1vF.mjs';
import './server.mjs';
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
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const HeadComponentCtxSymbol = Symbol("head-component");
const TagPositionProps = {
  /**
   * @deprecated Use tagPosition
   */
  body: { type: Boolean, default: void 0 },
  tagPosition: { type: String }
};
const normalizeProps = (_props) => {
  const props = Object.fromEntries(
    Object.entries(_props).filter(([_, value]) => value !== void 0)
  );
  if (typeof props.body !== "undefined") {
    props.tagPosition = props.body ? "bodyClose" : "head";
  }
  if (typeof props.renderPriority !== "undefined") {
    props.tagPriority = props.renderPriority;
  }
  return props;
};
function useHeadComponentCtx() {
  return inject(HeadComponentCtxSymbol, createHeadComponentCtx, true);
}
function createHeadComponentCtx() {
  const prev = inject(HeadComponentCtxSymbol, null);
  if (prev) {
    return prev;
  }
  const input = reactive({});
  const entry = useHead(input);
  const ctx = { input, entry };
  provide(HeadComponentCtxSymbol, ctx);
  return ctx;
}
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: { type: [String, Object, Array], default: void 0 },
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: { type: [String, Object, Array], default: void 0 },
  tabindex: String,
  title: String,
  translate: String,
  /**
   * @deprecated Use tagPriority
   */
  renderPriority: [String, Number],
  /**
   * Unhead prop to modify the priority of the tag.
   */
  tagPriority: { type: [String, Number] }
};
defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    title: String
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.noscript ||= [];
    const idx = input.noscript.push({}) - 1;
    return () => {
      const noscript = normalizeProps(props);
      const slotVnodes = slots.default?.();
      const textContent = [];
      if (slotVnodes) {
        for (const vnode of slotVnodes) {
          if (vnode.children) {
            textContent.push(vnode.children);
          }
        }
      }
      if (textContent.length > 0) {
        noscript.innerHTML = textContent.join("");
      }
      input.noscript[idx] = noscript;
      return null;
    };
  }
});
defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    /** @deprecated **/
    methods: String,
    /** @deprecated **/
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.link ||= [];
    const idx = input.link.push({}) - 1;
    return () => {
      input.link[idx] = normalizeProps(props);
      return null;
    };
  }
});
defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.base = normalizeProps(props);
      return null;
    };
  }
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup(_, { slots }) {
    const { input } = useHeadComponentCtx();
    return () => {
      const defaultSlot = slots.default?.();
      input.title = defaultSlot?.[0]?.children ? String(defaultSlot?.[0]?.children) : void 0;
      return null;
    };
  }
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    property: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.meta ||= [];
    const idx = input.meta.push({}) - 1;
    return () => {
      const meta = { "http-equiv": props.httpEquiv, ...normalizeProps(props) };
      if ("httpEquiv" in meta) {
        delete meta.httpEquiv;
      }
      input.meta[idx] = meta;
      return null;
    };
  }
});
defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    /** @deprecated **/
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.style ||= [];
    const idx = input.style.push({}) - 1;
    return () => {
      const style = normalizeProps(props);
      const textContent = slots.default?.()?.[0]?.children;
      if (textContent) {
        input.style[idx] = style;
        style.textContent = textContent;
      }
      return null;
    };
  }
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => {
    createHeadComponentCtx();
    return () => ctx.slots.default?.();
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.htmlAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.bodyAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
const _sfc_main$1 = {
  __name: "GlassmorphCard",
  __ssrInlineRender: true,
  props: {
    width: {
      type: String,
      default: "300px"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = {
        style: {
          ":--v648a51f4": props.height,
          ":--v17fc3007": props.width
        }
      };
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "container"
      }, _attrs, _cssVars))} data-v-ab53f376><div class="card" data-v-ab53f376><div class="front" data-v-ab53f376>`);
      ssrRenderSlot(_ctx.$slots, "front", {}, null, _push, _parent);
      _push(`</div><div class="back" data-v-ab53f376>`);
      ssrRenderSlot(_ctx.$slots, "back", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GlassmorphCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ab53f376"]]);
const _sfc_main = {
  setup() {
    useHead({
      titleTemplate: "%s - useHead example",
      bodyAttrs: {
        class: "test"
      }
    });
    return {
      dynamic: ref(49)
    };
  },
  head: {
    title: "Another title"
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Html = Html;
  const _component_Head = Head;
  const _component_Title = Title;
  const _component_Meta = Meta;
  const _component_v_row = resolveComponent("v-row");
  const _component_v_col = resolveComponent("v-col");
  const _component_GlassmorphCard = __nuxt_component_4;
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Html, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Product to help developers in their work`);
                  } else {
                    return [createTextVNode("Product to help developers in their work")];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_Meta, {
                name: "description",
                content: "In this pages you can find a code generator based on Domain Driven Design, a custom made Continuous Integration and a pallete explorer."
              }, null, _parent3, _scopeId2));
            } else {
              return [createVNode(_component_Title, null, {
                default: withCtx(() => [createTextVNode("Product to help developers in their work")]),
                _: 1
              }), createVNode(_component_Meta, {
                name: "description",
                content: "In this pages you can find a code generator based on Domain Driven Design, a custom made Continuous Integration and a pallete explorer."
              })];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [createVNode(_component_Head, null, {
          default: withCtx(() => [createVNode(_component_Title, null, {
            default: withCtx(() => [createTextVNode("Product to help developers in their work")]),
            _: 1
          }), createVNode(_component_Meta, {
            name: "description",
            content: "In this pages you can find a code generator based on Domain Driven Design, a custom made Continuous Integration and a pallete explorer."
          })]),
          _: 1
        })];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_v_row, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_col, {
          class: "text-left"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h1 data-v-664c2a68${_scopeId2}>Products</h1><p data-v-664c2a68${_scopeId2}> Did you find a bug? Report it here <a href="https://github.com/jlabrada71/juanlabrada/issues" target="_blank" rel="noopener noreferrer" title="contribute" data-v-664c2a68${_scopeId2}> issue board </a>. </p><div class="d-flex flex-wrap ma-8 background" data-v-664c2a68${_scopeId2}><div class="pa-4" data-v-664c2a68${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="pa-4" transition="fab-transition" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}><a href="https://github.com/jlabrada71/mabayjs" target="_blank" data-v-664c2a68${_scopeId3}>MabayJS</a></h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Model based code generator.</span></div></div>`);
                  } else {
                    return [createVNode("div", {
                      class: "pa-4",
                      transition: "fab-transition"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                      href: "https://github.com/jlabrada71/mabayjs",
                      target: "_blank"
                    }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])];
                  }
                }),
                back: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="pa-4" transition="fab-transition" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}><a href="https://github.com/jlabrada71/mabayjs" target="_blank" data-v-664c2a68${_scopeId3}>MabayJS</a></h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Model based code generator.</span></div></div>`);
                  } else {
                    return [createVNode("div", {
                      class: "pa-4",
                      transition: "fab-transition"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                      href: "https://github.com/jlabrada71/mabayjs",
                      target: "_blank"
                    }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div><div class="pa-4" data-v-664c2a68${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="pa-4" transition="fab-transition" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}><a href="https://github.com/jlabrada71/luisitin" target="_blank" data-v-664c2a68${_scopeId3}>Luisitin</a></h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Continuous Integration solution.</span></div></div>`);
                  } else {
                    return [createVNode("div", {
                      class: "pa-4",
                      transition: "fab-transition"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                      href: "https://github.com/jlabrada71/luisitin",
                      target: "_blank"
                    }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])];
                  }
                }),
                back: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div data-v-664c2a68${_scopeId3}><div class="pa-4" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}><a href="https://github.com/jlabrada71/luisitin" target="_blank" data-v-664c2a68${_scopeId3}>Luisitin</a></h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Continuous Integration solution.</span></div></div></div>`);
                  } else {
                    return [createVNode("div", null, [createVNode("div", {
                      class: "pa-4"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                      href: "https://github.com/jlabrada71/luisitin",
                      target: "_blank"
                    }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])])];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div><div class="pa-4" data-v-664c2a68${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div data-v-664c2a68${_scopeId3}><div class="pa-4" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_NuxtLink, {
                      to: "/color-tools"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Palette Generator`);
                        } else {
                          return [createTextVNode("Palette Generator")];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Harmonic Colors Palette generator.</span></div></div></div>`);
                  } else {
                    return [createVNode("div", null, [createVNode("div", {
                      class: "pa-4"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                      to: "/color-tools"
                    }, {
                      default: withCtx(() => [createTextVNode("Palette Generator")]),
                      _: 1
                    })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])];
                  }
                }),
                back: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div data-v-664c2a68${_scopeId3}><div class="pa-4" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_NuxtLink, {
                      to: "/color-tools"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Palette Generator`);
                        } else {
                          return [createTextVNode("Palette Generator")];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>Harmonic Colors Palette generator.</span></div></div></div>`);
                  } else {
                    return [createVNode("div", null, [createVNode("div", {
                      class: "pa-4"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                      to: "/color-tools"
                    }, {
                      default: withCtx(() => [createTextVNode("Palette Generator")]),
                      _: 1
                    })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div><div class="pa-4" data-v-664c2a68${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div data-v-664c2a68${_scopeId3}><div class="pa-4" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_NuxtLink, {
                      to: "/utm-builder"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Utm url builder`);
                        } else {
                          return [createTextVNode("Utm url builder")];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>This tool helps create Utm urls for ad campaigns.</span></div></div></div>`);
                  } else {
                    return [createVNode("div", null, [createVNode("div", {
                      class: "pa-4"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                      to: "/utm-builder"
                    }, {
                      default: withCtx(() => [createTextVNode("Utm url builder")]),
                      _: 1
                    })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])];
                  }
                }),
                back: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div data-v-664c2a68${_scopeId3}><div class="pa-4" data-v-664c2a68${_scopeId3}><div data-v-664c2a68${_scopeId3}><h2 data-v-664c2a68${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_NuxtLink, {
                      to: "/utm-builder"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Utm url builder`);
                        } else {
                          return [createTextVNode("Utm url builder")];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</h2></div><div data-v-664c2a68${_scopeId3}><span data-v-664c2a68${_scopeId3}>This tool helps create Utm urls for ad campaigns.</span></div></div></div>`);
                  } else {
                    return [createVNode("div", null, [createVNode("div", {
                      class: "pa-4"
                    }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                      to: "/utm-builder"
                    }, {
                      default: withCtx(() => [createTextVNode("Utm url builder")]),
                      _: 1
                    })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div></div><p data-v-664c2a68${_scopeId2}>I look forward to bring up more exciting features in the future.</p>`);
            } else {
              return [createVNode("h1", null, "Products"), createVNode("p", null, [createTextVNode(" Did you find a bug? Report it here "), createVNode("a", {
                href: "https://github.com/jlabrada71/juanlabrada/issues",
                target: "_blank",
                rel: "noopener noreferrer",
                title: "contribute"
              }, " issue board "), createTextVNode(". ")]), createVNode("div", {
                class: "d-flex flex-wrap ma-8 background"
              }, [createVNode("div", {
                class: "pa-4"
              }, [createVNode(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx(() => [createVNode("div", {
                  class: "pa-4",
                  transition: "fab-transition"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                  href: "https://github.com/jlabrada71/mabayjs",
                  target: "_blank"
                }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])]),
                back: withCtx(() => [createVNode("div", {
                  class: "pa-4",
                  transition: "fab-transition"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                  href: "https://github.com/jlabrada71/mabayjs",
                  target: "_blank"
                }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])]),
                _: 1
              })]), createVNode("div", {
                class: "pa-4"
              }, [createVNode(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx(() => [createVNode("div", {
                  class: "pa-4",
                  transition: "fab-transition"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                  href: "https://github.com/jlabrada71/luisitin",
                  target: "_blank"
                }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])]),
                back: withCtx(() => [createVNode("div", null, [createVNode("div", {
                  class: "pa-4"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
                  href: "https://github.com/jlabrada71/luisitin",
                  target: "_blank"
                }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])])]),
                _: 1
              })]), createVNode("div", {
                class: "pa-4"
              }, [createVNode(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx(() => [createVNode("div", null, [createVNode("div", {
                  class: "pa-4"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                  to: "/color-tools"
                }, {
                  default: withCtx(() => [createTextVNode("Palette Generator")]),
                  _: 1
                })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])]),
                back: withCtx(() => [createVNode("div", null, [createVNode("div", {
                  class: "pa-4"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                  to: "/color-tools"
                }, {
                  default: withCtx(() => [createTextVNode("Palette Generator")]),
                  _: 1
                })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])]),
                _: 1
              })]), createVNode("div", {
                class: "pa-4"
              }, [createVNode(_component_GlassmorphCard, {
                height: "200px"
              }, {
                front: withCtx(() => [createVNode("div", null, [createVNode("div", {
                  class: "pa-4"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                  to: "/utm-builder"
                }, {
                  default: withCtx(() => [createTextVNode("Utm url builder")]),
                  _: 1
                })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])]),
                back: withCtx(() => [createVNode("div", null, [createVNode("div", {
                  class: "pa-4"
                }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
                  to: "/utm-builder"
                }, {
                  default: withCtx(() => [createTextVNode("Utm url builder")]),
                  _: 1
                })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])]),
                _: 1
              })])]), createVNode("p", null, "I look forward to bring up more exciting features in the future.")];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [createVNode(_component_v_col, {
          class: "text-left"
        }, {
          default: withCtx(() => [createVNode("h1", null, "Products"), createVNode("p", null, [createTextVNode(" Did you find a bug? Report it here "), createVNode("a", {
            href: "https://github.com/jlabrada71/juanlabrada/issues",
            target: "_blank",
            rel: "noopener noreferrer",
            title: "contribute"
          }, " issue board "), createTextVNode(". ")]), createVNode("div", {
            class: "d-flex flex-wrap ma-8 background"
          }, [createVNode("div", {
            class: "pa-4"
          }, [createVNode(_component_GlassmorphCard, {
            height: "200px"
          }, {
            front: withCtx(() => [createVNode("div", {
              class: "pa-4",
              transition: "fab-transition"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
              href: "https://github.com/jlabrada71/mabayjs",
              target: "_blank"
            }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])]),
            back: withCtx(() => [createVNode("div", {
              class: "pa-4",
              transition: "fab-transition"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
              href: "https://github.com/jlabrada71/mabayjs",
              target: "_blank"
            }, "MabayJS")])]), createVNode("div", null, [createVNode("span", null, "Model based code generator.")])])]),
            _: 1
          })]), createVNode("div", {
            class: "pa-4"
          }, [createVNode(_component_GlassmorphCard, {
            height: "200px"
          }, {
            front: withCtx(() => [createVNode("div", {
              class: "pa-4",
              transition: "fab-transition"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
              href: "https://github.com/jlabrada71/luisitin",
              target: "_blank"
            }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])]),
            back: withCtx(() => [createVNode("div", null, [createVNode("div", {
              class: "pa-4"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode("a", {
              href: "https://github.com/jlabrada71/luisitin",
              target: "_blank"
            }, "Luisitin")])]), createVNode("div", null, [createVNode("span", null, "Continuous Integration solution.")])])])]),
            _: 1
          })]), createVNode("div", {
            class: "pa-4"
          }, [createVNode(_component_GlassmorphCard, {
            height: "200px"
          }, {
            front: withCtx(() => [createVNode("div", null, [createVNode("div", {
              class: "pa-4"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
              to: "/color-tools"
            }, {
              default: withCtx(() => [createTextVNode("Palette Generator")]),
              _: 1
            })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])]),
            back: withCtx(() => [createVNode("div", null, [createVNode("div", {
              class: "pa-4"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
              to: "/color-tools"
            }, {
              default: withCtx(() => [createTextVNode("Palette Generator")]),
              _: 1
            })])]), createVNode("div", null, [createVNode("span", null, "Harmonic Colors Palette generator.")])])])]),
            _: 1
          })]), createVNode("div", {
            class: "pa-4"
          }, [createVNode(_component_GlassmorphCard, {
            height: "200px"
          }, {
            front: withCtx(() => [createVNode("div", null, [createVNode("div", {
              class: "pa-4"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
              to: "/utm-builder"
            }, {
              default: withCtx(() => [createTextVNode("Utm url builder")]),
              _: 1
            })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])]),
            back: withCtx(() => [createVNode("div", null, [createVNode("div", {
              class: "pa-4"
            }, [createVNode("div", null, [createVNode("h2", null, [createVNode(_component_NuxtLink, {
              to: "/utm-builder"
            }, {
              default: withCtx(() => [createTextVNode("Utm url builder")]),
              _: 1
            })])]), createVNode("div", null, [createVNode("span", null, "This tool helps create Utm urls for ad campaigns.")])])])]),
            _: 1
          })])]), createVNode("p", null, "I look forward to bring up more exciting features in the future.")]),
          _: 1
        })];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-664c2a68"]]);

export { products as default };
//# sourceMappingURL=products-Cp8q93da.mjs.map
