import { _ as _sfc_main$2 } from './api-request-2GI0Ni_4.mjs';
import { ref, computed, resolveComponent, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'axios';

const _sfc_main$1 = {
  __name: "UtmCreationForm",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const showFeedback = ref(false);
    const feedbackMessage = ref("Thanks for sending your message.");
    const feedbackColor = ref("success");
    const formValidity = ref(false);
    const nameRules = ref([(value) => value != null && value.trim().length > 1 || "I like to know your name."]);
    const form = ref({
      url: "https://juanlabrada.com",
      id: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: ""
    });
    const utmForm = ref(null);
    const utmList = computed(() => Object.keys(form.value).map((key) => key !== "url" && form.value[key].trim() !== "" ? `utm_${key}=${form.value[key]}` : "").reduce((a, v) => v !== "" ? a += "&" + v : a, ""));
    const finalUrl = computed(() => `${form.value.url}?${utmList.value.substring(1)}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ActionFeedback = _sfc_main$2;
      const _component_v_form = resolveComponent("v-form");
      const _component_v_text_field = resolveComponent("v-text-field");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_ActionFeedback, {
        message: feedbackMessage.value,
        color: feedbackColor.value,
        show: showFeedback.value,
        "onUpdate:show": ($event) => showFeedback.value = $event
      }, null, _parent));
      _push(`<div width="600" class="mx-auto"><div>Utm Generation form</div><div>`);
      _push(ssrRenderComponent(_component_v_form, {
        ref_key: "utmForm",
        ref: utmForm,
        modelValue: formValidity.value,
        "onUpdate:modelValue": ($event) => formValidity.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.url,
              "onUpdate:modelValue": ($event) => form.value.url = $event,
              label: "target url?  (e.g. https://www.example.com)",
              rules: nameRules.value
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.id,
              "onUpdate:modelValue": ($event) => form.value.id = $event,
              label: "Campaign id?",
              rules: nameRules.value
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Use utm_source to identify a search engine, newsletter name, or other source.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.source,
              "onUpdate:modelValue": ($event) => form.value.source = $event,
              label: "Campaign source? The referrer (e.g. google, newsletter)",
              rules: nameRules.value,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Use utm_medium to identify a medium such as email or cost-per-click.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.medium,
              "onUpdate:modelValue": ($event) => form.value.medium = $event,
              label: "Campaign medium? Marketing medium (e.g. cpc, banner, email)",
              rules: nameRules.value,
              required: ""
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.campaign,
              "onUpdate:modelValue": ($event) => form.value.campaign = $event,
              label: "Campaign name? Product, promo code, or slogan (e.g. spring_sale) One of campaign name or campaign id are required.",
              rules: nameRules.value
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Used for paid search. Use utm_term to note the keywords for this ad.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.term,
              "onUpdate:modelValue": ($event) => form.value.term = $event,
              label: "Campaign term? Identify the paid keywords.(e.g. running+shoes)",
              rules: nameRules.value
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL.</p>`);
            _push2(ssrRenderComponent(_component_v_text_field, {
              modelValue: form.value.content,
              "onUpdate:modelValue": ($event) => form.value.content = $event,
              label: "Campaign content? (e.g. logolink)",
              rules: nameRules.value
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h2${_scopeId}>Final Url</h2><h3${_scopeId}>${ssrInterpolate(unref(finalUrl))}</h3></div>`);
          } else {
            return [createVNode(_component_v_text_field, {
              modelValue: form.value.url,
              "onUpdate:modelValue": ($event) => form.value.url = $event,
              label: "target url?  (e.g. https://www.example.com)",
              rules: nameRules.value
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign."), createVNode(_component_v_text_field, {
              modelValue: form.value.id,
              "onUpdate:modelValue": ($event) => form.value.id = $event,
              label: "Campaign id?",
              rules: nameRules.value
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Use utm_source to identify a search engine, newsletter name, or other source."), createVNode(_component_v_text_field, {
              modelValue: form.value.source,
              "onUpdate:modelValue": ($event) => form.value.source = $event,
              label: "Campaign source? The referrer (e.g. google, newsletter)",
              rules: nameRules.value,
              required: ""
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Use utm_medium to identify a medium such as email or cost-per-click."), createVNode(_component_v_text_field, {
              modelValue: form.value.medium,
              "onUpdate:modelValue": ($event) => form.value.medium = $event,
              label: "Campaign medium? Marketing medium (e.g. cpc, banner, email)",
              rules: nameRules.value,
              required: ""
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign."), createVNode(_component_v_text_field, {
              modelValue: form.value.campaign,
              "onUpdate:modelValue": ($event) => form.value.campaign = $event,
              label: "Campaign name? Product, promo code, or slogan (e.g. spring_sale) One of campaign name or campaign id are required.",
              rules: nameRules.value
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Used for paid search. Use utm_term to note the keywords for this ad."), createVNode(_component_v_text_field, {
              modelValue: form.value.term,
              "onUpdate:modelValue": ($event) => form.value.term = $event,
              label: "Campaign term? Identify the paid keywords.(e.g. running+shoes)",
              rules: nameRules.value
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("p", null, "Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL."), createVNode(_component_v_text_field, {
              modelValue: form.value.content,
              "onUpdate:modelValue": ($event) => form.value.content = $event,
              label: "Campaign content? (e.g. logolink)",
              rules: nameRules.value
            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]), createVNode("div", null, [createVNode("h2", null, "Final Url"), createVNode("h3", null, toDisplayString(unref(finalUrl)), 1)])];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UtmCreationForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UtmCreationForm = _sfc_main$1;
  _push(ssrRenderComponent(_component_UtmCreationForm, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/utm-builder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const utmBuilder = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { utmBuilder as default };
//# sourceMappingURL=utm-builder-BmmxRwKw.mjs.map
