import { ref, computed, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$1 = {
  __name: "PaletteCreator",
  __ssrInlineRender: true,
  setup(__props) {
    function hsl(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color2 = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color2).toString(16).padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }
    const color = ref({
      h: 200,
      s: 1,
      l: 0.5,
      a: 1
    });
    const hue = computed(() => Math.floor(color.value.h));
    const hueComplement = computed(() => hue.value + 100);
    const hueRightAnalogous = computed(() => hue.value + 30);
    const hueLeftAnalogous = computed(() => hue.value - 30);
    const primary = computed(() => hsl(hue.value, 25, 95));
    const primaryDark500 = computed(() => hsl(hue.value, 20, 85));
    const primaryDark600 = computed(() => hsl(hue.value, 20, 75));
    const secondary = computed(() => hsl(hue.value, 5, 25));
    const secondaryLight500 = computed(() => hsl(hueComplement.value, 5, 30));
    const secondaryLight900 = computed(() => hsl(hueComplement.value, 5, 95));
    const secondaryDark500 = computed(() => hsl(hueComplement.value, 5, 20));
    const accentV1 = computed(() => hsl(hueRightAnalogous.value, 40, 40));
    const accentV1Light900 = computed(() => hsl(hueRightAnalogous.value, 40, 95));
    const accentV2 = computed(() => hsl(hueLeftAnalogous.value, 40, 40));
    const accentV2Light900 = computed(() => hsl(hueLeftAnalogous.value, 40, 90));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_color_picker = resolveComponent("v-color-picker");
      const _cssVars = {
        style: {
          ":--v46fe8daa": primary.value,
          ":--v0e352bd8": primaryDark500.value,
          ":--v0e352456": primaryDark600.value,
          ":--v076c1346": secondary.value,
          ":--fc6bb4c8": secondaryLight500.value,
          ":--fc6b96c0": secondaryLight900.value,
          ":--v26a850a2": secondaryDark500.value,
          ":--v793f6edc": accentV1.value,
          ":--v488a83c2": accentV1Light900.value,
          ":--v793f6edd": accentV2.value,
          ":--v6fff2d20": accentV2Light900.value
        }
      };
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "palette-show"
      }, _attrs, _cssVars))} data-v-ac9b2fac><section data-v-ac9b2fac><h1 data-v-ac9b2fac>Harmonic Colors Palette </h1>`);
      _push(ssrRenderComponent(_component_v_color_picker, {
        modelValue: color.value,
        "onUpdate:modelValue": ($event) => color.value = $event,
        "hide-canvas": "",
        "hide-inputs": "",
        "hide-swatches": ""
      }, null, _parent));
      _push(`<span data-v-ac9b2fac>hue: <input type="number"${ssrRenderAttr("value", hue.value)} min="0" max="360" data-v-ac9b2fac></span><br data-v-ac9b2fac><span data-v-ac9b2fac>hueComplement: ${ssrInterpolate(hueComplement.value)}</span><br data-v-ac9b2fac><span data-v-ac9b2fac>hueRightAnalogous: ${ssrInterpolate(hueRightAnalogous.value)}</span><br data-v-ac9b2fac><span data-v-ac9b2fac>hueLeftAnalogous: ${ssrInterpolate(hueLeftAnalogous.value)}</span><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>primary: ${ssrInterpolate(primary.value)}</span></div><div class="palette primary" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>primaryDark500: ${ssrInterpolate(primaryDark500.value)}</span></div><div class="palette primary-dark500" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>primaryDark600: ${ssrInterpolate(primaryDark600.value)}</span></div><div class="palette primary-dark600" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>secondary: ${ssrInterpolate(secondary.value)}</span></div><div class="palette secondary" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>secondaryLight500: ${ssrInterpolate(secondaryLight500.value)}</span></div><div class="palette secondary-light500" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>secondaryLight900: ${ssrInterpolate(secondaryLight900.value)}</span></div><div class="palette secondary-light900" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>secondaryDark500: ${ssrInterpolate(secondaryDark500.value)}</span></div><div class="palette secondary-dark500" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>accentV1: ${ssrInterpolate(accentV1.value)}</span></div><div class="palette accentv1" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>accentV1Light900: ${ssrInterpolate(accentV1Light900.value)}</span></div><div class="palette accentv1-light900" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>accentV2: ${ssrInterpolate(accentV2.value)}</span></div><div class="palette accentv2" data-v-ac9b2fac></div><br data-v-ac9b2fac><div data-v-ac9b2fac><span data-v-ac9b2fac>accentV2Light900: ${ssrInterpolate(accentV2Light900.value)}</span></div><div class="palette accentv2-light900" data-v-ac9b2fac></div><br data-v-ac9b2fac></section><section data-v-ac9b2fac><div data-v-ac9b2fac><div class="container" data-v-ac9b2fac><h2 data-v-ac9b2fac>Palette Demo</h2><div class="cp-grid" data-v-ac9b2fac><div class="cp-widget cp-grid-col-full" data-v-ac9b2fac><p data-v-ac9b2fac>Colors on this page are distributed using the 60/30/10 ratio and divided into three categories: primary, secondary, and accent. To provide variety, these categories are further used to generate different tints and shades.</p></div><div class="cp-widget cp-grid-col-full" data-v-ac9b2fac><div id="swatches" data-v-ac9b2fac><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div><div data-v-ac9b2fac></div></div></div><div data-v-ac9b2fac><span class="cp-grid-label" data-v-ac9b2fac>Primary Color</span></div><div class="cp-widget" data-v-ac9b2fac><p data-v-ac9b2fac>The body background of this page takes the primary color which covers nearly the 60% of the total UI.</p></div><div data-v-ac9b2fac><span class="cp-grid-label" data-v-ac9b2fac>Secondary Color</span></div><div class="cp-widget" data-v-ac9b2fac><p data-v-ac9b2fac>A sample paragraph demonstrating the default body text color. Anything that doesn&#39;t carry or inherit any text color style will be shown in this color by default.</p></div><div data-v-ac9b2fac><span class="cp-grid-label" data-v-ac9b2fac>Accent Color</span></div><div class="cp-widget" data-v-ac9b2fac><p data-v-ac9b2fac>The accent color constitutes about 10% of small but vital details of a UI based on the 60/30/10 rule. <a href="#" data-v-ac9b2fac>Hyperlinks</a> are the most common example where accent is used.</p></div><div data-v-ac9b2fac><span class="cp-grid-label" data-v-ac9b2fac>Kitchen Sink</span></div><div class="cp-widget" data-v-ac9b2fac><p data-v-ac9b2fac>Our sweet and simple, regular paragraph element that adopts the secondary color by default.</p><p class="fade-1" data-v-ac9b2fac>A text fragment with a lighter tone of the secondary color. It is generated by using the same hue as the secondary color but adjusting saturation and lightness.</p><p class="cp-box" data-v-ac9b2fac>A highlighted box-like element that uses variations of the primary color as its background and border.</p><p class="cp-box cp-box--dark" data-v-ac9b2fac>Another box element themed using variations of the secondary color.</p><a href="#" class="cp-btn" data-v-ac9b2fac>CTA example</a></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaletteCreator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ac9b2fac"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_PaletteCreator = __nuxt_component_0;
  _push(ssrRenderComponent(_component_PaletteCreator, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/color-tools.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colorTools = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { colorTools as default };
//# sourceMappingURL=color-tools-BuIOvP-r.mjs.map
