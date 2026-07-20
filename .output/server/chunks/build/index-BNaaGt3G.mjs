import { _ as __nuxt_component_0$5 } from './nuxt-link-BCVcy1vF.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, ref, computed, unref, isRef, createVNode, withModifiers, nextTick, defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, withAsyncContext, toValue, reactive, onServerPrefetch, toRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrGetDynamicModelProps, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _sfc_main$f, A as ApiRequest, l as log, g as gsapWithCSS } from './api-request-2GI0Ni_4.mjs';
import { createHash } from 'node:crypto';
import { isPlainObject } from '@vue/shared';
import { b as useRuntimeConfig, f as fetchDefaults, u as useNuxtApp, a as asyncDataDefaults, c as createError } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import VueMermaidString from 'vue-mermaid-string';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'xss';
import 'axios';
import 'vue-router';

function serialize(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash(input) {
  return digest(serialize(input));
}

//#region src/index.ts
const DEBOUNCE_DEFAULTS = { trailing: true };
/**
Debounce functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
```
import { debounce } from 'perfect-debounce';
const expensiveCall = async input => input;
const debouncedFn = debounce(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await debouncedFn(number));
}
//=> 1
//=> 2
//=> 3
```
*/
function debounce(fn, wait = 25, options = {}) {
	options = {
		...DEBOUNCE_DEFAULTS,
		...options
	};
	if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
	let leadingValue;
	let timeout;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		currentPromise = _applyPromised(fn, _this, args);
		currentPromise.finally(() => {
			currentPromise = null;
			if (options.trailing && trailingArgs && !timeout) {
				const promise = applyFn(_this, trailingArgs);
				trailingArgs = null;
				return promise;
			}
		});
		return currentPromise;
	};
	const debounced = function(...args) {
		if (options.trailing) trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = !timeout && options.leading;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const promise = options.leading ? leadingValue : applyFn(this, args);
				trailingArgs = null;
				for (const _resolve of resolveList) _resolve(promise);
				resolveList = [];
			}, wait);
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
	const _clearTimeout = (timer) => {
		if (timer) {
			clearTimeout(timer);
			timeout = null;
		}
	};
	debounced.isPending = () => !!timeout;
	debounced.cancel = () => {
		_clearTimeout(timeout);
		resolveList = [];
		trailingArgs = null;
	};
	debounced.flush = () => {
		_clearTimeout(timeout);
		if (!trailingArgs || currentPromise) return;
		const args = trailingArgs;
		trailingArgs = null;
		return applyFn(this, args);
	};
	return debounced;
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$4 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$e = {
  __name: "QuoteWindow",
  __ssrInlineRender: true,
  setup(__props) {
    const quotes = [{
      title: "",
      text: "A good coach can change a game. A great coach can change a life.",
      author: ""
    }, {
      title: "",
      text: "In preparing for battle I have always found that plans are useless but planning is indispensable.",
      author: "Dwight D. Eisenhower"
    }, {
      title: "",
      text: "First, solve the problem. Then, write the code.",
      author: ""
    }, {
      title: "",
      text: "For it is the mark of an educated person to search for the same kind of clarity in each topic to the extent that the nature of the matter accepts it.",
      author: "Aristóteles"
    }, {
      title: "",
      text: "Self-awareness arises from reflection, Change starts with inquiring.",
      author: ""
    }, {
      title: "",
      text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi"
    }, {
      title: "",
      text: "To homogenize should never be a goal. Things only get value in comparison. The value is in the gap between two different things. The tension between different things is released either by breaking them apart or moving them toward the minimum energy state.",
      author: ""
    }, {
      title: "",
      text: "Without data you’re just another person with an opinion.",
      author: "William Edwards Deming"
    }];
    ref(quotes[Math.floor(Math.random() * quotes.length)]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$4;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuoteWindow.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _imports_0$1 = "" + __buildAssetsURL("juan-image.CDKdi2wW.png");
const _sfc_main$d = {
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileOpen = ref(false);
    const navLinks = [{
      label: "Experience",
      href: "#experiences"
    }, {
      label: "Products",
      href: "#products"
    }, {
      label: "Experiments",
      href: "#experiments"
    }, {
      label: "Posts",
      href: "#posts"
    }];
    const photoModalOpen = ref(false);
    const overlay = ref(null);
    const modal = ref(null);
    async function openModal() {
      photoModalOpen.value = true;
      await nextTick();
      gsapWithCSS.set(overlay.value, {
        opacity: 0
      });
      gsapWithCSS.set(modal.value, {
        opacity: 0,
        scale: 0.9,
        y: 24
      });
      gsapWithCSS.to(overlay.value, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out"
      });
      gsapWithCSS.to(modal.value, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "back.out(1.6)"
      });
      (void 0).addEventListener("keydown", onKeydown);
      (void 0).body.style.overflow = "hidden";
    }
    function closeModal() {
      if (!photoModalOpen.value) return;
      gsapWithCSS.to(modal.value, {
        opacity: 0,
        scale: 0.9,
        y: 24,
        duration: 0.2,
        ease: "power2.in"
      });
      gsapWithCSS.to(overlay.value, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          photoModalOpen.value = false;
          (void 0).body.style.overflow = "";
        }
      });
      (void 0).removeEventListener("keydown", onKeydown);
    }
    function onKeydown(e) {
      if (e.key === "Escape") closeModal();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      const _component_QuoteWindow = _sfc_main$e;
      _push(`<!--[--><header class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8" style="${ssrRenderStyle({
        "background": "rgba(11,19,38,0.8)",
        "backdrop-filter": "blur(24px)",
        "-webkit-backdrop-filter": "blur(24px)",
        "border-bottom": "1px solid rgba(0,240,255,0.1)"
      })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3 font-geist font-semibold text-cyber-text text-lg tracking-tight hover:text-cyber-primary transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Juan Labrada <img${ssrRenderAttr("src", _imports_0$1)} alt="Juan Labrada" class="w-8 h-8 rounded-full object-cover cursor-pointer" style="${ssrRenderStyle({
              "border": "1px solid rgba(0, 240, 255, 0.3)"
            })}"${_scopeId}>`);
          } else {
            return [createTextVNode(" Juan Labrada "), createVNode("img", {
              src: _imports_0$1,
              alt: "Juan Labrada",
              class: "w-8 h-8 rounded-full object-cover cursor-pointer",
              style: {
                "border": "1px solid rgba(0, 240, 255, 0.3)"
              },
              onClick: withModifiers(openModal, ["stop", "prevent"])
            })];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-8"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} class="label-caps text-cyber-muted hover:text-cyber-text transition-colors">${ssrInterpolate(link.label)}</a>`);
      });
      _push(`<!--]--></nav><a href="#contact" class="btn-primary-cyber hidden md:inline-flex"> Contact </a><button class="md:hidden text-cyber-muted hover:text-cyber-text transition-colors" aria-label="Toggle menu"><span class="mdi mdi-menu text-2xl"></span></button>`);
      if (mobileOpen.value) {
        _push(`<div class="absolute top-16 left-0 right-0 flex flex-col items-start gap-4 p-6" style="${ssrRenderStyle({
          "background": "rgba(11,19,38,0.96)",
          "backdrop-filter": "blur(24px)",
          "border-bottom": "1px solid rgba(0,240,255,0.1)"
        })}"><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(`<a${ssrRenderAttr("href", link.href)} class="label-caps text-cyber-muted hover:text-cyber-text transition-colors">${ssrInterpolate(link.label)}</a>`);
        });
        _push(`<!--]--><a href="#contact" class="btn-primary-cyber mt-2"> Contact </a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (photoModalOpen.value) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-6" style="${ssrRenderStyle({
            "background": "rgba(6, 14, 32, 0.8)",
            "backdrop-filter": "blur(4px)"
          })}"><div class="glass-card relative max-w-md w-full max-h-[85vh] overflow-y-auto p-6 flex flex-col items-center gap-2"><button type="button" aria-label="Close" class="absolute top-3 right-3 w-10 h-10 rounded-full glass-card flex items-center justify-center text-cyber-primary hover:shadow-glow-primary transition-shadow"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button><img${ssrRenderAttr("src", _imports_0$1)} alt="Juan Labrada" class="w-32 h-32 rounded-full border border-cyber-primary/30 shadow-glow-primary object-cover mt-2"><span class="label-caps text-cyber-text text-center">Juan Labrada</span>`);
          _push2(ssrRenderComponent(_component_QuoteWindow, null, null, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHeader.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0$3 = Object.assign(_sfc_main$d, { __name: "SiteHeader" });
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main$c = {
  __name: "RecentCertificates",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const {
      data: certificates
    } = ([__temp, __restore] = withAsyncContext(() => useFetch("/certificates/certificates.json", {
      default: () => []
    }, "$2Fvb5d5J8U")), __temp = await __temp, __restore(), __temp);
    ref(null);
    const activeIndex = ref(0);
    const activeCert = ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "certifications",
        class: "w-full py-16 px-6 glass-card",
        style: {
          "background": "rgba(23, 31, 51, 0.35)"
        }
      }, _attrs))} data-v-b2c7905d><div class="max-w-5xl mx-auto" data-v-b2c7905d><p class="label-caps text-cyber-primary mb-3" data-v-b2c7905d>Credentials</p><h2 class="font-geist font-semibold text-cyber-text mb-3" style="${ssrRenderStyle({
        "font-size": "2.5rem",
        "letter-spacing": "-0.01em"
      })}" data-v-b2c7905d> Certifications </h2><p class="font-hanken text-cyber-muted text-sm mb-12 max-w-xl" data-v-b2c7905d> Commitment to continuous learning in AI and software engineering. </p><div class="relative" data-v-b2c7905d><button type="button" aria-label="Previous certificate" class="hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-card text-cyber-primary hover:shadow-glow-primary transition-shadow" data-v-b2c7905d><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" data-v-b2c7905d><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z" clip-rule="evenodd" data-v-b2c7905d></path></svg></button><div class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar" data-v-b2c7905d><!--[-->`);
      ssrRenderList(unref(certificates), (cert) => {
        _push(`<div class="glass-card p-5 flex flex-col gap-4 flex-none w-72 snap-start" data-v-b2c7905d><button type="button" class="rounded-xl overflow-hidden border border-cyber-primary/30 shadow-glow-primary cursor-pointer"${ssrRenderAttr("aria-label", `View ${cert.title} certificate`)} data-v-b2c7905d><img${ssrRenderAttr("src", `/certificates/${cert.file}`)}${ssrRenderAttr("alt", cert.title)} class="w-full h-40 object-cover" loading="lazy" data-v-b2c7905d></button><div class="flex items-center justify-between gap-2" data-v-b2c7905d><span class="label-caps text-cyber-text" data-v-b2c7905d>${ssrInterpolate(cert.title)}</span><button type="button" class="btn-ghost-cyber text-xs px-3 py-1.5 flex-none" data-v-b2c7905d>View</button></div></div>`);
      });
      _push(`<!--]--></div><button type="button" aria-label="Next certificate" class="hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-card text-cyber-primary hover:shadow-glow-primary transition-shadow" data-v-b2c7905d><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" data-v-b2c7905d><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0z" clip-rule="evenodd" data-v-b2c7905d></path></svg></button></div><div class="flex items-center justify-center gap-2 mt-6" data-v-b2c7905d><!--[-->`);
      ssrRenderList(unref(certificates), (cert, index2) => {
        _push(`<button type="button"${ssrRenderAttr("aria-label", `Go to ${cert.title}`)} class="${ssrRenderClass([index2 === activeIndex.value ? "bg-cyber-primary shadow-glow-primary w-6" : "bg-cyber-outline-subtle", "w-2 h-2 rounded-full transition-all"])}" data-v-b2c7905d></button>`);
      });
      _push(`<!--]--></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (activeCert.value) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-6" style="${ssrRenderStyle({
            "background": "rgba(6, 14, 32, 0.8)",
            "backdrop-filter": "blur(4px)"
          })}" data-v-b2c7905d><div class="glass-card relative max-w-3xl w-full p-6 flex flex-col gap-4" data-v-b2c7905d><button type="button" aria-label="Close" class="absolute top-3 right-3 w-10 h-10 rounded-full glass-card flex items-center justify-center text-cyber-primary hover:shadow-glow-primary transition-shadow" data-v-b2c7905d><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" data-v-b2c7905d><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-b2c7905d></path></svg></button><img${ssrRenderAttr("src", `/certificates/${activeCert.value.file}`)}${ssrRenderAttr("alt", activeCert.value.title)} class="w-full max-h-[75vh] object-contain rounded-xl border border-cyber-primary/30 shadow-glow-primary" data-v-b2c7905d><span class="label-caps text-cyber-text text-center" data-v-b2c7905d>${ssrInterpolate(activeCert.value.title)}</span></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentCertificates.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$c, [["__scopeId", "data-v-b2c7905d"]]), { __name: "RecentCertificates" });
const _sfc_main$b = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_RecentCertificates = __nuxt_component_0$2;
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-16",
    style: {
      "background": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,240,255,0.12) 0%, transparent 60%), linear-gradient(rgba(11,19,38,0.85), rgba(11,19,38,0.85)), url('/images/hero-image-vue.png')",
      "background-size": "cover, cover, cover",
      "background-position": "center, center, center",
      "background-repeat": "no-repeat, no-repeat, no-repeat"
    }
  }, _attrs))}><div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({
    "background-image": "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
    "background-size": "48px 48px"
  })}"></div><div class="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full min-w-0"><span class="label-caps text-cyber-primary"> Fullstack AI Engineer · Claude · LangChain · Vue.js · Node.js </span><h1 class="font-geist font-bold text-cyber-text leading-tight" style="${ssrRenderStyle({
    "font-size": "clamp(2.5rem, 6vw, 4rem)",
    "letter-spacing": "-0.02em"
  })}"> Solving the <span style="${ssrRenderStyle({
    "color": "#00f0ff"
  })}">unsolvable</span><span class="text-cyber-text"> with AI-driven architecture</span></h1><p class="text-cyber-text">Specializing in AI Solutions with Vue.js/Nuxt frontend systems and highly scalable Node.js backend infrastructures.</p>`);
  _push(ssrRenderComponent(_component_RecentCertificates, null, null, _parent));
  _push(`<div class="flex flex-wrap gap-4 justify-center mt-2"><a href="#products" class="btn-primary-cyber">View Projects</a><a href="#experiences" class="btn-ghost-cyber">Experience</a></div></div></section>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroPage.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$5]]), { __name: "HeroPage" });
const _sfc_main$a = {
  __name: "RecentExperiences",
  __ssrInlineRender: true,
  setup(__props) {
    const experiences = [{
      role: "Senior Software Developer",
      company: "MonetizeMore",
      period: "2022 – Present",
      description: "Built and maintained ad tech revenue optimization platform features using Vue.js and Node.js.",
      tags: ["Vue.js", "Node.js", "TypeScript"]
    }, {
      role: "Senior Software Developer",
      company: "WPlex",
      period: "2020 – 2022",
      description: "Developed full-stack web applications and REST APIs for WordPress hosting infrastructure.",
      tags: ["Vue.js", "PHP", "REST API"]
    }, {
      role: "Senior Software Developer",
      company: "Experian",
      period: "2018 – 2020",
      description: "Contributed to credit data analytics dashboards and data pipeline integrations.",
      tags: ["Angular", "Java", "SQL"]
    }];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "experiences",
        class: "w-full py-24 px-6",
        style: {
          "background": "#0b1326"
        }
      }, _attrs))}><div class="max-w-5xl mx-auto"><p class="label-caps text-cyber-primary mb-3">Career</p><h2 class="font-geist font-semibold text-cyber-text mb-12" style="${ssrRenderStyle({
        "font-size": "2.5rem",
        "letter-spacing": "-0.01em"
      })}"> Experience </h2><div class="flex flex-col gap-6"><!--[-->`);
      ssrRenderList(experiences, (exp) => {
        _push(`<div class="glass-card p-6 flex flex-col sm:flex-row sm:items-start gap-4"><div class="flex-1"><h3 class="font-geist font-semibold text-cyber-text text-lg mb-1">${ssrInterpolate(exp.role)}</h3><p class="text-cyber-primary font-medium mb-2">${ssrInterpolate(exp.company)}</p>`);
        if (exp.description) {
          _push(`<p class="font-hanken text-cyber-muted text-sm leading-relaxed">${ssrInterpolate(exp.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap gap-2 mt-3"><!--[-->`);
        ssrRenderList(exp.tags, (tag) => {
          _push(`<span class="tech-chip">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
        if (exp.period) {
          _push(`<span class="font-jetbrains text-cyber-muted text-xs whitespace-nowrap mt-1">${ssrInterpolate(exp.period)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentExperiences.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "RecentProducts",
  __ssrInlineRender: true,
  setup(__props) {
    const products = [{
      title: "MabayJS",
      type: "OSS",
      problem: "Manually writing boilerplate code for CRUD models slows down development cycles.",
      stack: ["Node.js", "JavaScript"],
      url: "https://github.com/jlabrada71/mabayjs",
      linkLabel: "View on GitHub"
    }, {
      title: "Palette Generator",
      type: "Tool",
      problem: "Designers need instant harmonic color palettes with contrast-safe combinations.",
      stack: ["Vue.js", "chroma-js"],
      url: "/color-tools",
      linkLabel: "Open Tool"
    }, {
      title: "UTM Builder",
      type: "Tool",
      problem: "Marketing teams waste time hand-crafting UTM tracking URLs for ad campaigns.",
      stack: ["Vue.js", "Nuxt"],
      url: "/utm-builder",
      linkLabel: "Open Tool"
    }];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$5;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "products",
        class: "w-full py-24 px-6",
        style: {
          "background": "#0d1628"
        }
      }, _attrs))}><div class="max-w-5xl mx-auto"><p class="label-caps text-cyber-primary mb-3">Work</p><h2 class="font-geist font-semibold text-cyber-text mb-12" style="${ssrRenderStyle({
        "font-size": "2.5rem",
        "letter-spacing": "-0.01em"
      })}"> Products </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(products, (product) => {
        _push(`<div class="glass-card p-6 flex flex-col gap-4"><div class="flex items-start justify-between"><h3 class="font-geist font-semibold text-cyber-text text-lg">${ssrInterpolate(product.title)}</h3><span class="tech-chip">${ssrInterpolate(product.type)}</span></div><div class="flex flex-col gap-3 flex-1"><div><p class="label-caps text-cyber-muted mb-1">Problem</p><p class="font-hanken text-cyber-muted text-sm leading-relaxed">${ssrInterpolate(product.problem)}</p></div><div><p class="label-caps text-cyber-muted mb-1">Stack</p><div class="flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(product.stack, (tag) => {
          _push(`<span class="tech-chip">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: product.url,
          class: "btn-ghost-cyber text-center mt-auto text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(product.linkLabel)}`);
            } else {
              return [createTextVNode(toDisplayString(product.linkLabel), 1)];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentProducts.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  name: "ExperimentCard"
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "card"
  }, _attrs))} data-v-dbdbae5a>`);
  ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
  _push(`<div class="panel" data-v-dbdbae5a>`);
  ssrRenderSlot(_ctx.$slots, "show", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/experiments/ShowCard.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-dbdbae5a"]]), { __name: "ShowCard" });
const _imports_0 = "" + __buildAssetsURL("1028-400x400.Dp5BkDx6.jpg");
const _imports_1 = "" + __buildAssetsURL("15-400x400.BqQVTh-R.jpg");
const _imports_2 = "" + __buildAssetsURL("1039-400x400.32DJT6K6.jpg");
const _imports_3 = "" + __buildAssetsURL("106-400x400.tfQniRTw.jpg");
const _imports_4 = "" + __buildAssetsURL("136-400x400.DtnCDixc.jpg");
const _imports_5 = "" + __buildAssetsURL("110-400x400.C77eDXYR.jpg");
const _imports_6 = "" + __buildAssetsURL("1047-400x400.saPlo0tf.jpg");
const _imports_7 = "" + __buildAssetsURL("1057-400x400.B34SQslb.jpg");
const _imports_8 = "" + __buildAssetsURL("1016-400x400.DOkB5JDV.jpg");
const _imports_9 = "" + __buildAssetsURL("1015-400x400.Xhbfzp9r.jpg");
const _imports_10 = "" + __buildAssetsURL("1020-400x400.FnYbwooJ.jpg");
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_ShowCard = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_ShowCard, _attrs, {
    show: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="gallery" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="a forest after an apocalypse" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="a waterfall and many rocks" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="a house on a mountain" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="sime pink flowers" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="big rocks with some trees" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="a waterfall, a lot of tree and a great view from the sky" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_5)} alt="a cool landscape" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_6)} alt="inside a town between two big buildings" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_7)} alt="a great view of the sea above the mountain" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_8)} alt="a great view of a canyon" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_9)} alt="a great view of a river between mountains" data-v-18f97a26${_scopeId}><img${ssrRenderAttr("src", _imports_10)} alt="a wild bear appeared" data-v-18f97a26${_scopeId}></div>`);
      } else {
        return [createVNode("div", {
          class: "gallery"
        }, [createVNode("img", {
          src: _imports_0,
          alt: "a forest after an apocalypse"
        }), createVNode("img", {
          src: _imports_1,
          alt: "a waterfall and many rocks"
        }), createVNode("img", {
          src: _imports_2,
          alt: "a house on a mountain"
        }), createVNode("img", {
          src: _imports_3,
          alt: "sime pink flowers"
        }), createVNode("img", {
          src: _imports_4,
          alt: "big rocks with some trees"
        }), createVNode("img", {
          src: _imports_2,
          alt: "a waterfall, a lot of tree and a great view from the sky"
        }), createVNode("img", {
          src: _imports_5,
          alt: "a cool landscape"
        }), createVNode("img", {
          src: _imports_6,
          alt: "inside a town between two big buildings"
        }), createVNode("img", {
          src: _imports_7,
          alt: "a great view of the sea above the mountain"
        }), createVNode("img", {
          src: _imports_8,
          alt: "a great view of a canyon"
        }), createVNode("img", {
          src: _imports_9,
          alt: "a great view of a river between mountains"
        }), createVNode("img", {
          src: _imports_10,
          alt: "a wild bear appeared"
        })])];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/experiments/ImageGallery4.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-18f97a26"]]), { __name: "ImageGallery4" });
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_ShowCard = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_ShowCard, _attrs, {
    show: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="gallery" data-v-2fc7beb8${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="a forest after an apocalypse" data-v-2fc7beb8${_scopeId}><img${ssrRenderAttr("src", _imports_1)} alt="a waterfall and many rocks" data-v-2fc7beb8${_scopeId}><img${ssrRenderAttr("src", _imports_2)} alt="a house on a mountain" data-v-2fc7beb8${_scopeId}><img${ssrRenderAttr("src", _imports_3)} alt="sime pink flowers" data-v-2fc7beb8${_scopeId}><img${ssrRenderAttr("src", _imports_4)} alt="big rocks with some trees" data-v-2fc7beb8${_scopeId}></div>`);
      } else {
        return [createVNode("div", {
          class: "gallery"
        }, [createVNode("img", {
          src: _imports_0,
          alt: "a forest after an apocalypse"
        }), createVNode("img", {
          src: _imports_1,
          alt: "a waterfall and many rocks"
        }), createVNode("img", {
          src: _imports_2,
          alt: "a house on a mountain"
        }), createVNode("img", {
          src: _imports_3,
          alt: "sime pink flowers"
        }), createVNode("img", {
          src: _imports_4,
          alt: "big rocks with some trees"
        })])];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/experiments/ImageGallery1.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-2fc7beb8"]]), { __name: "ImageGallery1" });
const baseDiagram = `
  stateDiagram
   direction TB

   accTitle: This is the accessible title
   accDescr: This is an accessible description

   classDef notMoving fill:white
   classDef movement font-style:italic
   classDef activeState fill:#f00,color:white,font-weight:bold,stroke-width:2px,stroke:yellow

   [*] --> Wrapper
   Wrapper --> PrebidJS : Configure Bids
   Wrapper --> PrebidJS : Request Bids

   state PrebidJS {
    AuctionConfigured --> ConfigureBidders
    ConfigureBidders --> [*]
    RequestingBids --> PrebidAuction

    ReturnBestBid --> BidsBack
    BidsBack --> ScaleBids

    ReturnScaledBids --> SelectWinner
    SelectWinner --> SetTargetting
   }

   state PrebidServer {
      PrebidAuction --> SelectBestBid
      SelectBestBid --> ReturnBestBid

   }

   state Wrapper {

    ConfigureAuction --> AuctionConfigured

    ScaleBids --> ReturnScaledBids
    SetTargetting --> RefreshSlot
    RefreshSlot --> AdServerAuction
    RenderCreative --> [*]

   }

   state AdServer {
      AdServerAuction --> AuctionWon
      AuctionWon --> RenderCreative
   }

   `;
const _sfc_main$5 = {
  __name: "MermaidDemo",
  __ssrInlineRender: true,
  setup(__props) {
    let currentState = "ConfigureAuction";
    const diagram2 = ref(baseDiagram);
    function generateDiagram() {
      diagram2.value = baseDiagram + `class ${currentState} activeState`;
    }
    generateDiagram();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(VueMermaidString), {
        value: diagram2.value
      }, null, _parent));
      _push(`<button>Next</button></main>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/experiments/MermaidDemo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_ImageGallery4 = __nuxt_component_0;
  const _component_ImageGallery1 = __nuxt_component_1;
  const _component_MermaidDemo = _sfc_main$5;
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "experiments",
    class: "w-full py-24 px-6",
    style: {
      "background": "#0b1326"
    }
  }, _attrs))}><div class="max-w-5xl mx-auto"><p class="label-caps text-cyber-primary mb-3">Playground</p><h2 class="font-geist font-semibold text-cyber-text mb-12" style="${ssrRenderStyle({
    "font-size": "2.5rem",
    "letter-spacing": "-0.01em"
  })}"> Experiments </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="glass-card p-6 flex flex-col gap-3"><h3 class="font-geist font-semibold text-cyber-text">Gallery 1</h3><p class="font-hanken text-cyber-muted text-sm">Changing image width and height on hover within a grid.</p><div class="mt-auto overflow-hidden rounded-lg">`);
  _push(ssrRenderComponent(_component_ImageGallery4, null, null, _parent));
  _push(`</div></div><div class="glass-card p-6 flex flex-col gap-3"><h3 class="font-geist font-semibold text-cyber-text">Gallery 2</h3><p class="font-hanken text-cyber-muted text-sm">Expanding image width on hover within a grid.</p><div class="mt-auto overflow-hidden rounded-lg">`);
  _push(ssrRenderComponent(_component_ImageGallery1, null, null, _parent));
  _push(`</div></div><div class="glass-card p-6 flex flex-col gap-3"><h3 class="font-geist font-semibold text-cyber-text">Mermaid Graph</h3><p class="font-hanken text-cyber-muted text-sm">Generating UML diagrams from text using Mermaid.</p><div class="mt-auto overflow-hidden rounded-lg">`);
  _push(ssrRenderComponent(_component_MermaidDemo, null, null, _parent));
  _push(`</div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentExperiments.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]), { __name: "RecentExperiments" });
const _sfc_main$3 = {
  __name: "RecentPosts",
  __ssrInlineRender: true,
  setup(__props) {
    const posts = [{
      title: "4 Rules of Simple Design",
      url: "https://docs.juanlabrada.com/blog/4-rules-of-simple-design"
    }, {
      title: "Test Driven Development ROI",
      url: "https://docs.juanlabrada.com/blog/test-driven-development-roi"
    }, {
      title: "Liskov Substitution Principle",
      url: "https://docs.juanlabrada.com/blog/liskov-substitution-principle"
    }];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "posts",
        class: "w-full py-24 px-6",
        style: {
          "background": "#0d1628"
        }
      }, _attrs))}><div class="max-w-5xl mx-auto"><p class="label-caps text-cyber-primary mb-3">Writing</p><h2 class="font-geist font-semibold text-cyber-text mb-12" style="${ssrRenderStyle({
        "font-size": "2.5rem",
        "letter-spacing": "-0.01em"
      })}"> Posts </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(posts, (post) => {
        _push(`<a${ssrRenderAttr("href", post.url)} target="_blank" rel="noopener" class="glass-card p-6 flex flex-col gap-3 group" style="${ssrRenderStyle({
          "text-decoration": "none"
        })}"><h3 class="font-geist font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors">${ssrInterpolate(post.title)}</h3><span class="label-caps text-cyber-primary mt-auto">Read →</span></a>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecentPosts.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
class MessageRepositoryProxy {
  constructor(config) {
    this.config = config;
  }
  // TODO: extract this function, otherwise it will be repeated in all repositories.
  static getHeaders() {
    const authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return {
      headers: {
        Authorization: authorization
      }
    };
  }
  async findAll(query) {
    try {
      let queryString = "";
      if (query) {
        let operator = "?";
        const keys = Object.keys(query);
        keys.forEach((key) => {
          queryString += `${operator}${key}=${query[key]}`;
          operator = "&";
        });
      }
      const url = `${this.config.public.apiServer}/api/v1/messages${queryString}`;
      const response = await ApiRequest.get(url, MessageRepositoryProxy.getHeaders());
      return response.data;
    } catch (e) {
      log(e, "FindAll");
    }
    return [];
  }
  async delete(message) {
    const entityId = message._id;
    const url = `${this.config.public.apiServer}/api/v1/messages/${entityId}`;
    try {
      await ApiRequest.delete(url, MessageRepositoryProxy.getHeaders());
    } catch (e) {
      log(e, "Delete");
    }
  }
  async add(message) {
    const url = `${this.config.public.apiServer}/api/v1/messages`;
    try {
      await ApiRequest.post(url, {
        message
      });
    } catch (e) {
      log(e, "Add");
    }
  }
  async update(message) {
    const entityId = message._id;
    const url = `${this.config.public.apiServer}/api/v1/messages/${entityId}`;
    try {
      await ApiRequest.put(url, {
        message: message.toJSON()
      }, MessageRepositoryProxy.getHeaders());
    } catch (e) {
      log(e, "update");
    }
  }
}
const _sfc_main$2 = {
  __name: "ContactMe",
  __ssrInlineRender: true,
  setup(__props) {
    const schema = yup.object({
      email: yup.string().required().email(),
      name: yup.string().required(),
      message: yup.string().required()
    });
    const {
      errors,
      values,
      defineField,
      handleSubmit
    } = useForm({
      validationSchema: schema
    });
    const [email, emailAttrs] = defineField("email");
    const [name, nameAttrs] = defineField("name");
    const [message, messageAttrs] = defineField("message");
    const feedbackMessage = ref("Thanks for sending your message.");
    const showFeedback = ref(false);
    const loading = ref(false);
    const errorList = computed(() => {
      return Object.keys(errors.value).map((key) => errors.value[key]);
    });
    handleSubmit(async (values2, actions) => {
      loading.value = true;
      const runtimeConfig = useRuntimeConfig();
      const messageRepository = new MessageRepositoryProxy(runtimeConfig);
      await messageRepository.add({
        ...values2,
        date: new Date(Date.now())
      });
      loading.value = false;
      showFeedback.value = true;
      actions.resetForm();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ActionFeedback = _sfc_main$f;
      let _temp0, _temp1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "w-full py-24 px-6",
        style: {
          "background": "#0b1326"
        }
      }, _attrs))}><div class="max-w-2xl mx-auto"><p class="label-caps text-cyber-primary mb-3">Let&#39;s Talk</p><h2 class="font-geist font-semibold text-cyber-text mb-12" style="${ssrRenderStyle({
        "font-size": "2.5rem",
        "letter-spacing": "-0.01em"
      })}"> Contact Me </h2>`);
      _push(ssrRenderComponent(_component_ActionFeedback, {
        message: unref(feedbackMessage),
        show: unref(showFeedback),
        "onUpdate:show": ($event) => isRef(showFeedback) ? showFeedback.value = $event : null
      }, null, _parent));
      _push(`<form class="glass-card p-8 flex flex-col gap-6">`);
      if (unref(errorList).length > 0) {
        _push(`<div class="p-3 rounded" style="${ssrRenderStyle({
          "background": "rgba(255,180,171,0.1)",
          "border": "1px solid rgba(255,180,171,0.3)"
        })}"><ul class="text-sm" style="${ssrRenderStyle({
          "color": "#ffb4ab"
        })}"><!--[-->`);
        ssrRenderList(unref(errorList), (error) => {
          _push(`<li>${ssrInterpolate(error)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col gap-1"><label for="name" class="label-caps text-cyber-muted">Name</label><input${ssrRenderAttrs((_temp0 = mergeProps({
        id: "name",
        type: "text",
        value: unref(name)
      }, unref(nameAttrs), {
        class: "input-cyber font-hanken",
        placeholder: "Your name"
      }), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(name)))))}></div><div class="flex flex-col gap-1"><label for="email" class="label-caps text-cyber-muted">Email</label><input${ssrRenderAttrs((_temp1 = mergeProps({
        id: "email",
        type: "email",
        value: unref(email)
      }, unref(emailAttrs), {
        class: "input-cyber font-hanken",
        placeholder: "your@email.com"
      }), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, unref(email)))))}></div><div class="flex flex-col gap-1"><label for="message" class="label-caps text-cyber-muted">Message</label><textarea${ssrRenderAttrs(mergeProps({
        id: "message"
      }, unref(messageAttrs), {
        rows: "5",
        class: "input-cyber font-hanken resize-none",
        placeholder: "What's on your mind?"
      }), "textarea")}>${ssrInterpolate(unref(message))}</textarea></div><button type="submit" class="btn-primary-cyber self-start"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Sending..." : "Send Message")}</button></form></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactMe.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const appVersion = config.public.appVersion;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "w-full py-6 px-6 text-center",
        style: {
          "background": "#0b1326"
        }
      }, _attrs))}><p class="text-sm text-cyber-muted">v${ssrInterpolate(unref(appVersion))}</p></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SiteHeader = __nuxt_component_0$3;
  const _component_HeroPage = __nuxt_component_1$1;
  const _component_RecentExperiences = _sfc_main$a;
  const _component_RecentProducts = _sfc_main$9;
  const _component_RecentExperiments = __nuxt_component_4;
  const _component_RecentPosts = _sfc_main$3;
  const _component_ContactMe = _sfc_main$2;
  const _component_SiteFooter = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "bg-cyber-bg w-full"
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_SiteHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_HeroPage, null, null, _parent));
  _push(ssrRenderComponent(_component_RecentExperiences, null, null, _parent));
  _push(ssrRenderComponent(_component_RecentProducts, null, null, _parent));
  _push(ssrRenderComponent(_component_RecentExperiments, null, null, _parent));
  _push(ssrRenderComponent(_component_RecentPosts, null, null, _parent));
  _push(ssrRenderComponent(_component_ContactMe, null, null, _parent));
  _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-BNaaGt3G.mjs.map
