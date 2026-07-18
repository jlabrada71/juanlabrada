import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { LRUCache } from 'lru-cache';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { FilterXSS } from 'xss';

const suspectProtoRx$1 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx$1 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx$1 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform$1(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped$1(key);
    return;
  }
  return value;
}
function warnKeyDropped$1(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr$1(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx$1.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx$1.test(value) || suspectConstructorRx$1.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform$1);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE$1 = /#/g;
const AMPERSAND_RE$1 = /&/g;
const SLASH_RE$1 = /\//g;
const EQUAL_RE$1 = /=/g;
const IM_RE = /\?/g;
const PLUS_RE$1 = /\+/g;
const ENC_CARET_RE$1 = /%5e/gi;
const ENC_BACKTICK_RE$1 = /%60/gi;
const ENC_PIPE_RE$1 = /%7c/gi;
const ENC_SPACE_RE$1 = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue$1(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE$1, "%2B").replace(ENC_SPACE_RE$1, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE$1, "%26").replace(ENC_BACKTICK_RE$1, "`").replace(ENC_CARET_RE$1, "^").replace(SLASH_RE$1, "%2F");
}
function encodeQueryKey$1(text) {
  return encodeQueryValue$1(text).replace(EQUAL_RE$1, "%3D");
}
function encodePath(text) {
  return encode$1(text).replace(HASH_RE$1, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE$1, "%26").replace(PLUS_RE$1, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey$1(text) {
  return decode$1(text.replace(PLUS_RE$1, " "));
}
function decodeQueryValue$1(text) {
  return decode$1(text.replace(PLUS_RE$1, " "));
}

function parseQuery$1(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey$1(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue$1(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem$1(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey$1(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey$1(key)}=${encodeQueryValue$1(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey$1(key)}=${encodeQueryValue$1(value)}`;
}
function stringifyQuery$1(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem$1(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX$1 = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX$1 = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX$1 = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE$1 = /^\.?\//;
function hasProtocol$1(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX$1.test(inputString);
  }
  return PROTOCOL_REGEX$1.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX$1.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash$1(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash$1(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash$1(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash$1(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash$1(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash$1(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withoutBase(input, base) {
  if (isEmptyURL$1(base)) {
    return input;
  }
  const _base = withoutTrailingSlash$1(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery$1(input, query) {
  const parsed = parseURL$1(input);
  const mergedQuery = { ...parseQuery$1(parsed.search), ...query };
  parsed.search = stringifyQuery$1(mergedQuery);
  return stringifyParsedURL$1(parsed);
}
function getQuery$3(input) {
  return parseQuery$1(parseURL$1(input).search);
}
function isEmptyURL$1(url) {
  return !url || url === "/";
}
function isNonEmptyURL$1(url) {
  return url && url !== "/";
}
function joinURL$1(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL$1(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE$1, "");
      url = withTrailingSlash$1(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol$1(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative$1 = Symbol.for("ufo:protocolRelative");
function parseURL$1(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol$1(input, { acceptRelative: true })) {
    return parsePath$1(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath$1(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative$1]: !protocol
  };
}
function parsePath$1(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL$1(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative$1] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject$2(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu$2(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$2(defaults)) {
    return _defu$2(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$2(value) && isPlainObject$2(object[key])) {
      object[key] = _defu$2(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu$2(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu$2(p, c, "", merger), {})
  );
}
const defu$2 = createDefu$2();

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp$1(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

let H3Error$1 = class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode$1(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage$1(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
};
function createError$2(input) {
  if (typeof input === "string") {
    return new H3Error$1(input);
  }
  if (isError$1(input)) {
    return input;
  }
  const err = new H3Error$1(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp$1(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode$1(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode$1(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage$1(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError$1(error) ? error : createError$2(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError$1(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery$2(event) {
  return getQuery$3(event.path || "");
}
function isMethod$1(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod$1(event, expected, allowHead) {
  if (!isMethod$1(event, expected)) {
    throw createError$2({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders$1(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader$1(event, name) {
  const headers = getRequestHeaders$1(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol$1 = Symbol.for("h3RawBody");
const PayloadMethods$1$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody$1(event, encoding = "utf8") {
  assertMethod$1(event, PayloadMethods$1$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol$1] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol$1] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol$1 in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody$1(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS$1 = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage$1(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS$1, "");
}
function sanitizeStatusCode$1(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent$1(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode$1(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode$1(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage$1(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode$1(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader$1(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders$1(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders$1;
function setResponseHeader$1(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader$1(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader$1(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp$1(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp$1(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode$1(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage$1(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody$1(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$2({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode$1(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage$1(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders$1(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp$1(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray$1(handler.onRequest),
    onBeforeResponse: _normalizeArray$1(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler$1(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray$1(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler$1(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler$1;
function isEventHandler(input) {
  return hasProp$1(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$2({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL$1(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash$1(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent$1(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$2(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$2({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL$1(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$2({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$2({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$2(_error);
      if (!isError$1(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr$1;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
createFetch({ fetch, Headers: Headers$1, AbortController });

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey$1(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$2(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function normalizeBaseKey$1(base) {
  base = normalizeKey$2(base);
  return base ? base + ":" : "";
}

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$2 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$2,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError$1(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError$1);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError$1(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError$1(driver, `Missing required option \`${name}\`.`);
}

const DRIVER_NAME$1 = "lru-cache";
const unstorage_47drivers_47lru_45cache = defineDriver((opts = {}) => {
  const cache = new LRUCache({
    max: 1e3,
    sizeCalculation: opts.maxSize || opts.maxEntrySize ? (value, key) => {
      return key.length + byteLength(value);
    } : void 0,
    ...opts
  });
  return {
    name: DRIVER_NAME$1,
    options: opts,
    getInstance: () => cache,
    hasItem(key) {
      return cache.has(key);
    },
    getItem(key) {
      return cache.get(key) ?? null;
    },
    getItemRaw(key) {
      return cache.get(key) ?? null;
    },
    setItem(key, value) {
      cache.set(key, value);
    },
    setItemRaw(key, value) {
      cache.set(key, value);
    },
    removeItem(key) {
      cache.delete(key);
    },
    getKeys() {
      return [...cache.keys()];
    },
    clear() {
      cache.clear();
    },
    dispose() {
      cache.clear();
    }
  };
});
function byteLength(value) {
  if (typeof Buffer !== "undefined") {
    try {
      return Buffer.byteLength(value);
    } catch {
    }
  }
  try {
    return typeof value === "string" ? value.length : JSON.stringify(value).length;
  } catch {
  }
  return 0;
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError$1(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('#rate-limiter-storage', unstorage_47drivers_47lru_45cache({"driver":"lruCache"}));
storage$1.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL$1(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler$1(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

function isPlainObject$1(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu$1(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject$1(defaults)) {
    return _defu$1(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject$1(value) && isPlainObject$1(object[key])) {
      object[key] = _defu$1(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu$1(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu$1(p, c, "", merger), {})
  );
}
const defu$1 = createDefu$1();
const defuFn = createDefu$1((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr$1(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "d7f78b5e-90cb-40fc-ab30-f9fcc62047ea",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "s-maxage=0"
        }
      },
      "/admin/**": {
        "ssr": false
      },
      "/api/v1/**": {
        "security": {
          "headers": {
            "crossOriginResourcePolicy": "cross-origin"
          },
          "corsHandler": {
            "origin": "*",
            "methods": "*",
            "allowHeaders": "*",
            "exposeHeaders": "*"
          }
        }
      },
      "/analytics/**": {
        "cors": true,
        "headers": {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "*",
          "access-control-allow-headers": "*",
          "access-control-max-age": "0",
          "Content-Type": "text/javascript"
        }
      },
      "/old-page": {
        "redirect": {
          "to": "/new-page",
          "statusCode": 307
        }
      },
      "/old-page2": {
        "redirect": {
          "to": "/new-page",
          "statusCode": 302
        }
      },
      "/**": {
        "headers": {
          "Referrer-Policy": "no-referrer",
          "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
          "X-Content-Type-Options": "nosniff",
          "X-Download-Options": "noopen",
          "X-Frame-Options": "SAMEORIGIN",
          "X-Permitted-Cross-Domain-Policies": "none",
          "X-XSS-Protection": "0"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "domain": "juanlabrada.com",
    "apiServer": "https://juanlabrada.com",
    "apiBase": "",
    "otherUrl": "",
    "env": "production"
  },
  "MONGO_URL": "mongodb+srv://tryyourideas:Cobian98@cluster0.k2rni.gcp.mongodb.net/juanlabrada?retryWrites=true&w=majority",
  "MONGO_DB": "juanlabrada",
  "MAILER_PASS": "YpqyHvFLtQBp",
  "MAILER_ACCOUNT": "agile@juanlabrada.com",
  "HEART_BEAT": "*/1 * * * *",
  "ZIP_IMAGES": "",
  "apiSecret": "123",
  "private": {
    "basicAuth": false
  },
  "security": {
    "strict": false,
    "headers": {
      "crossOriginResourcePolicy": "same-origin",
      "crossOriginOpenerPolicy": "same-origin",
      "crossOriginEmbedderPolicy": "require-corp",
      "contentSecurityPolicy": {
        "base-uri": [
          "'none'"
        ],
        "font-src": [
          "'self'",
          "https:",
          "data:"
        ],
        "form-action": [
          "'self'"
        ],
        "frame-ancestors": [
          "'self'"
        ],
        "img-src": [
          "'self'",
          "data:"
        ],
        "object-src": [
          "'none'"
        ],
        "script-src-attr": [
          "'none'"
        ],
        "style-src": [
          "'self'",
          "https:",
          "'unsafe-inline'"
        ],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'"
        ],
        "upgrade-insecure-requests": true
      },
      "originAgentCluster": "?1",
      "referrerPolicy": "no-referrer",
      "strictTransportSecurity": {
        "maxAge": 15552000,
        "includeSubdomains": true
      },
      "xContentTypeOptions": "nosniff",
      "xDNSPrefetchControl": "off",
      "xDownloadOptions": "noopen",
      "xFrameOptions": "SAMEORIGIN",
      "xPermittedCrossDomainPolicies": "none",
      "xXSSProtection": "0",
      "permissionsPolicy": {
        "camera": [],
        "display-capture": [],
        "fullscreen": [],
        "geolocation": [],
        "microphone": []
      }
    },
    "requestSizeLimiter": {
      "maxRequestSizeInBytes": 2000000,
      "maxUploadFileRequestInBytes": 8000000,
      "throwError": true
    },
    "rateLimiter": {
      "tokensPerInterval": 150,
      "interval": 300000,
      "headers": false,
      "driver": {
        "name": "lruCache"
      },
      "whiteList": "",
      "ipHeader": "",
      "throwError": true
    },
    "xssValidator": {
      "methods": [
        "GET",
        "POST"
      ],
      "throwError": true
    },
    "corsHandler": {
      "origin": "http://localhost:3000",
      "methods": [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE"
      ],
      "preflight": {
        "statusCode": 204
      }
    },
    "allowedMethodsRestricter": {
      "methods": "*",
      "throwError": true
    },
    "hidePoweredBy": true,
    "enabled": true,
    "csrf": false,
    "nonce": true,
    "removeLoggers": true,
    "ssg": {
      "meta": true,
      "hashScripts": true,
      "hashStyles": false,
      "nitroHeaders": true,
      "exportToPresets": true
    },
    "sri": true
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL$1(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$3(event.path);
        target = withQuery$1(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL$1(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$3(event.path);
        target = withQuery$1(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu$2({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader$1(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders$1(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders$1(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders$1(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery$1(joinURL$1(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await import('../_/error-500.mjs');
		setResponseHeader$1(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader$1(event, header, value);
			continue;
		}
		setResponseHeader$1(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders$1(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader$1(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();

const defuReplaceArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value;
    return true;
  }
});

const nitroAppSecurityOptions = {};
function getAppSecurityOptions() {
  return nitroAppSecurityOptions;
}
function resolveSecurityRules(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.rules) {
    const router = createRouter$1({ routes: structuredClone(nitroAppSecurityOptions) });
    const matcher = toRouteMatcher(router);
    const eventPathNoQuery = event.path.split("?")[0];
    const matches = eventPathNoQuery ? matcher.matchAll(eventPathNoQuery) : [];
    const rules = defuReplaceArray({}, ...matches.reverse());
    event.context.security.rules = rules;
  }
  return event.context.security.rules;
}
function resolveSecurityRoute(event) {
  if (!event.context.security) {
    event.context.security = {};
  }
  if (!event.context.security.route) {
    const routeNames = Object.fromEntries(Object.entries(nitroAppSecurityOptions).map(([name]) => [name, { name }]));
    const router = createRouter$1({ routes: routeNames });
    const eventPathNoQuery = event.path.split("?")[0];
    const match = eventPathNoQuery ? router.lookup(eventPathNoQuery) : void 0;
    const route = match?.name ?? "";
    event.context.security.route = route;
  }
  return event.context.security.route;
}

const KEYS_TO_NAMES = {
  contentSecurityPolicy: "Content-Security-Policy",
  crossOriginEmbedderPolicy: "Cross-Origin-Embedder-Policy",
  crossOriginOpenerPolicy: "Cross-Origin-Opener-Policy",
  crossOriginResourcePolicy: "Cross-Origin-Resource-Policy",
  originAgentCluster: "Origin-Agent-Cluster",
  referrerPolicy: "Referrer-Policy",
  strictTransportSecurity: "Strict-Transport-Security",
  xContentTypeOptions: "X-Content-Type-Options",
  xDNSPrefetchControl: "X-DNS-Prefetch-Control",
  xDownloadOptions: "X-Download-Options",
  xFrameOptions: "X-Frame-Options",
  xPermittedCrossDomainPolicies: "X-Permitted-Cross-Domain-Policies",
  xXSSProtection: "X-XSS-Protection",
  permissionsPolicy: "Permissions-Policy"
};
const NAMES_TO_KEYS = Object.fromEntries(Object.entries(KEYS_TO_NAMES).map(([key, name]) => [name, key]));
function getNameFromKey(key) {
  return KEYS_TO_NAMES[key];
}
function getKeyFromName(headerName) {
  const [, key] = Object.entries(NAMES_TO_KEYS).find(([name]) => name.toLowerCase() === headerName.toLowerCase()) || [];
  return key;
}
function headerStringFromObject(optionKey, optionValue) {
  if (optionValue === false) {
    return "";
  }
  if (optionKey === "contentSecurityPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (directive === "upgrade-insecure-requests") {
        return "upgrade-insecure-requests;";
      } else {
        const stringifiedSources = typeof sources === "string" ? sources : sources.map((source) => source.trim()).join(" ");
        return `${directive} ${stringifiedSources};`;
      }
    }).join(" ");
  } else if (optionKey === "strictTransportSecurity") {
    const policies = optionValue;
    return [
      `max-age=${policies.maxAge}`,
      policies.includeSubdomains && "includeSubDomains",
      policies.preload && "preload"
    ].filter(Boolean).join("; ");
  } else if (optionKey === "permissionsPolicy") {
    const policies = optionValue;
    return Object.entries(policies).filter(([, value]) => value !== false).map(([directive, sources]) => {
      if (typeof sources === "string") {
        return `${directive}=${sources}`;
      } else {
        return `${directive}=(${sources.join(" ")})`;
      }
    }).join(", ");
  } else {
    return optionValue;
  }
}
function headerObjectFromString(optionKey, headerValue) {
  if (!headerValue) {
    return false;
  }
  if (optionKey === "contentSecurityPolicy") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, ...sources] = directive.split(" ").map((token) => token.trim());
      if (type === "upgrade-insecure-requests") {
        objectForm[type] = true;
      } else {
        objectForm[type] = sources.join(" ");
      }
    }
    return objectForm;
  } else if (optionKey === "strictTransportSecurity") {
    const directives = headerValue.split(";").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      if (type === "max-age") {
        objectForm.maxAge = Number(value);
      } else if (type === "includeSubdomains" || type === "preload") {
        objectForm[type] = true;
      }
    }
    return objectForm;
  } else if (optionKey === "permissionsPolicy") {
    const directives = headerValue.split(",").map((directive) => directive.trim()).filter((directive) => directive);
    const objectForm = {};
    for (const directive of directives) {
      const [type, value] = directive.split("=").map((token) => token.trim());
      objectForm[type] = value;
    }
    return objectForm;
  } else {
    return headerValue;
  }
}
function standardToSecurity(standardHeaders) {
  if (!standardHeaders) {
    return void 0;
  }
  const standardHeadersAsObject = {};
  Object.entries(standardHeaders).forEach(([headerName, headerValue]) => {
    const optionKey = getKeyFromName(headerName);
    if (optionKey) {
      if (typeof headerValue === "string") {
        const objectValue = headerObjectFromString(optionKey, headerValue);
        standardHeadersAsObject[optionKey] = objectValue;
      } else {
        standardHeadersAsObject[optionKey] = headerValue;
      }
    }
  });
  if (Object.keys(standardHeadersAsObject).length === 0) {
    return void 0;
  }
  return standardHeadersAsObject;
}
function backwardsCompatibleSecurity(securityHeaders) {
  if (!securityHeaders) {
    return void 0;
  }
  const securityHeadersAsObject = {};
  Object.entries(securityHeaders).forEach(([key, value]) => {
    const optionKey = key;
    if ((optionKey === "contentSecurityPolicy" || optionKey === "permissionsPolicy" || optionKey === "strictTransportSecurity") && typeof value === "string") {
      const objectValue = headerObjectFromString(optionKey, value);
      securityHeadersAsObject[optionKey] = objectValue;
    } else if (value === "") {
      securityHeadersAsObject[optionKey] = false;
    } else {
      securityHeadersAsObject[optionKey] = value;
    }
  });
  return securityHeadersAsObject;
}

const _2kJDOfSuEPEYJfdGW3Tikb9JPPThbNP6rRRP3aRULyo = defineNitroPlugin(async (nitroApp) => {
  const appSecurityOptions = getAppSecurityOptions();
  const runtimeConfig = useRuntimeConfig();
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    if (!rule) continue;
    const { headers: headers2 } = rule;
    const securityHeaders2 = standardToSecurity(headers2);
    if (securityHeaders2) {
      appSecurityOptions[route] = { headers: securityHeaders2 };
    }
  }
  const securityOptions = runtimeConfig.security;
  const { headers } = securityOptions;
  const securityHeaders = backwardsCompatibleSecurity(headers);
  appSecurityOptions["/**"] = defuReplaceArray(
    { headers: securityHeaders },
    securityOptions,
    appSecurityOptions["/**"]
  );
  for (const route in runtimeConfig.nitro.routeRules) {
    const rule = runtimeConfig.nitro.routeRules[route];
    if (!rule) continue;
    const { security } = rule;
    if (security) {
      const { headers: headers2 } = security;
      const securityHeaders2 = backwardsCompatibleSecurity(headers2);
      appSecurityOptions[route] = defuReplaceArray(
        { headers: securityHeaders2 },
        security,
        appSecurityOptions[route]
      );
    }
  }
  nitroApp.hooks.hook("nuxt-security:headers", ({ route, headers: headers2 }) => {
    appSecurityOptions[route] = defuReplaceArray(
      { headers: headers2 },
      appSecurityOptions[route]
    );
  });
  nitroApp.hooks.hook("nuxt-security:ready", async () => {
    await nitroApp.hooks.callHook("nuxt-security:routeRules", appSecurityOptions);
  });
  await nitroApp.hooks.callHook("nuxt-security:ready");
});

const sriHashes = {"/_nuxt/builds/meta/d7f78b5e-90cb-40fc-ab30-f9fcc62047ea.json":"sha384-0qI7x4Pjqjj0AeE8dIhQUTfElUp/2IMx8Vl8X/cREdyAfHNwpbKCxtpUHFbt5p8w","/_nuxt/-PLQgQ95.js":"sha384-UEXb4fHYsZ1mjq5duxityJg3U48a8JK9TolwWz9xdE5w98k6JTqUDh/vnkKXWWGH","/_nuxt/-jXiw8J8.js":"sha384-VmE1lz83JTDo6cLYTDhwK+SwvNWZzRpRYZ/lvWYbedzWKm7kyEvjTXPbWr0xOaNK","/_nuxt/1015-400x400.Xhbfzp9r.jpg":"sha384-ECKLZKdDQsagoerkk+jEI9RCVreqyubh5YVZZvVat1yKZZoY/Ls+PK9V+R9z8tf2","/_nuxt/1016-400x400.DOkB5JDV.jpg":"sha384-bzi1beNVCHGxgQx5cO4UrRRE/wKkIZP26IOpS1hnHyvOQs4kI4rBbtBguJR4s7xw","/_nuxt/1020-400x400.FnYbwooJ.jpg":"sha384-vJEqldhiA5XJKnISsebeRrQ2J+d7iBGf4diO0C4g3JqG+srXAkhq8/lbxfEjdO5D","/_nuxt/1028-400x400.Dp5BkDx6.jpg":"sha384-Qsi1JRZuJXhOMlEXdlfLUU1vKSZ1vHc/MIi9e47421NLezaDFXPeqTvsMYNdpc23","/_nuxt/1039-400x400.32DJT6K6.jpg":"sha384-p1RvjTOv8MAlaT1W6WRsLwJmFJLlTqrjOu+8QK5hPIv2WNoNNg5FFLaEBLwa0idN","/_nuxt/1047-400x400.saPlo0tf.jpg":"sha384-joTQo1Kw5NcB+fJiJbKETTDbamgBiScR9HSmGuie43GIOlsbMdDo0s4Jy8XWaUok","/_nuxt/1057-400x400.B34SQslb.jpg":"sha384-RhYf1zvWad3bIexzrw0z8HXEypTRxwtZL/IcBT2K4sZRfp8ediPcuVtlDm6vrtss","/_nuxt/106-400x400.tfQniRTw.jpg":"sha384-73AHfaBBDs3RQi6gd5QeJ9ZdMyapetIIMkwvWPgCl1JGVVVCK/KLW446OgtdLseR","/_nuxt/110-400x400.C77eDXYR.jpg":"sha384-5u+zFPxS7tcRySy12s22BkQXvXiwovwaH7Luu7gOQwWvDmN8dNCeQfGAu+NWbr7z","/_nuxt/136-400x400.DtnCDixc.jpg":"sha384-EBIGz6QM8tl5nZOIMozNMWWpVxgCj27HIfyKb03Z0gM2BBaAcYYRuKLVcyRMAMGy","/_nuxt/15-400x400.BqQVTh-R.jpg":"sha384-SbW9YviM3ZrseynQCuTlppXm6Cs2kSpvNZ4gG1jhzGx44n8/9Y79aMea2/FOt91K","/_nuxt/2taj5khX.js":"sha384-hKv/zD7/FeR5xl9oXrTohhxjLv8CIQ9CbUktYOl4ga8hmzmDOeNd9HFLq0hJaoUz","/_nuxt/AdJbU6Do.js":"sha384-BGHmZSzOHUH5pPT+rf1DSXDu62dOV+uxFetFC6H3DGZI/U0Mgl01GnQcFy0tYEgn","/_nuxt/B0oSrkCJ.js":"sha384-vr1xTduSdHEDc98Z4CpNW9bYHpC66LU2kNg+kNwQR4gyAJuKQa73uDZ0a7Si43vp","/_nuxt/B1UqCew_.js":"sha384-L0R2d8hE1707sDQZBI1zgCfMEeC5pLiWVSO2Pe9rNgAq2g59VWG6bukWznpt+RLr","/_nuxt/B8_1F-aY.js":"sha384-6QMzSKR0mc5J+vDeaD9852kn/DsIIlfw4avXztjEmVZ2UQTrbAiiYFneenmjT7B4","/_nuxt/B9-AqJQa.js":"sha384-VD5xKck9MeckYtN4inVxLKeo3v+I2UkYhZjVtD9Cev47+G9DUqulJ2yvoxiu3iQo","/_nuxt/B9zSZHIH.js":"sha384-UpcpINGKki1EbT9NPcD0snLia3GaR68UkxF8osnuZXuDf4UGKVJFi/b9juU7E6jZ","/_nuxt/BCqWjfFD.js":"sha384-ZXwoDMHgwkzX4igb5oPLqLHXsDZnxT+MM8BtSG1GkaViHZKmFF1PZcAFfmh9g559","/_nuxt/BDDFrvEe.js":"sha384-l3wc0KYd06Jqpt/gdwWvXDB/ij70ZETemcNRoPhXMX7bao0AMNKWugcAmRSxnXyX","/_nuxt/BLHKwCB-.js":"sha384-9UiUVazVllaGbBz/ItA4P587jfSQkhQblmnRcOISUnFQ7rzcUmsNCyA7IAmCwUOw","/_nuxt/BNg6M2Te.js":"sha384-Ae6NEqhobNX57F/FzhYcQbqqrKfW0+XZ1+V6FIxQJPTL7tv/iKB+cFHhCaMjbyCq","/_nuxt/BU2KwT1u.js":"sha384-N9LOB+gQ407OnU9tyFwaiErpUB0k7gG/l0ymq4e5LuyizG0Y+dEkDQRjBMJmG4jn","/_nuxt/BUKi9EwU.js":"sha384-WVJ0ORRGuAXsTtqYRLLYo0uF7bMC77XzRoPVHaetYcycvEpA83ZBaSpgPstMdTP7","/_nuxt/BaqTgq05.js":"sha384-E56pQI3S04thaEgvmtliBnCo0NZZGmdUJHvoRuCFd1HUY+gE2gGlfbctl+KoNVGh","/_nuxt/Bb5MAZm_.js":"sha384-m12iZDaTqKp5mmqD+k5OicZD+um5aRQg96LgV14Si9Rp5rU1M6kHh9bj8ydpkwFx","/_nuxt/ByDV-aAu.js":"sha384-4iL4a7pEWjSvwesP377KK3nMQEHhiFOCjMmb9NUhezLacci7s7x2QoveWQtAoMOS","/_nuxt/BzqqaBM2.js":"sha384-fgY6R5xmedH6fz1uQazcW9uL01k6fMG0gpJKpDy0OL4GCtE13m8rR1NcOpHbLo+V","/_nuxt/C1ohtNt3.js":"sha384-hoNtnB3kEuhpELlISeSE+EeLTu056PnTajLqFMM+dj3o6wXDHrdKlllc12c0H7pn","/_nuxt/C3YJfAyO.js":"sha384-xHAr5+shmNb2i1kmFdFljawEkH4RFRNc8xvLrnyC+2yfZ/lHGvtCWe+iIrej+teU","/_nuxt/C4oFFobl.js":"sha384-I0VT8IHdHoKL/5mBuZWGWJB1J39m3h0Fb2kqZY7qTVOeq05r2XzOwU0ugbS/yQq/","/_nuxt/C5L4Pr5J.js":"sha384-e9Z8OiCZvyTzQXtVufu8ColaJCIhZSqSer7O//qVOWY0bXGRhQaJpXXNiOqdA/xl","/_nuxt/C8Bvg6Fz.js":"sha384-oXY9A8PZaOAzWwsHKxwe5PviWaPTeNFP5MYEmFI2fSrqmCzK60XqSIz60U5m27P6","/_nuxt/CCju15FN.js":"sha384-ra+z+HrGaqjL1xMp7KST+7dOzNAOCaNlqZRBo/rawh56CCB/nyfA/YF9GsuvPpuQ","/_nuxt/CEwCzN2O.js":"sha384-l8CpZdjmVNRKpdjG/6IH5oVisSZpAZQASC2acEcZQKB5ykVVgm+Uhl5lnAU+CBik","/_nuxt/CFLwXfRB.js":"sha384-kh5Ie+wWTmD/E5DEQrlaQmUotXrjdT/yW5GxYrVLMrMu/24nlEioXfYTesnpjvb9","/_nuxt/CMXpdbjM.js":"sha384-D9eB3JZWxKDQy03qLCB1pGoCJMpQhApGVpvAntntW9UzydmITNCFICU+zm6CJXaP","/_nuxt/CROEeeEl.js":"sha384-3Mb00ODntX47OtwScORr2X7LRJbK0cmzF2Z11UJsTw3YzRj589WgmiigcNXT324l","/_nuxt/CW0LXHrN.js":"sha384-i+rXptb3mF5ondL0W7sYFzY7ihPh5R2QY/3u4zCSF7LEFWBm3k1naQ1kMg9qY08S","/_nuxt/CXXp0Ybv.js":"sha384-Hl83aMp7WNwuyj4SoPWxqwXH2/vDA4eQaCFbLwhFwVGP3fMYaCAdCxfQLpAkIQyI","/_nuxt/CerpFSJ7.js":"sha384-HYjTpJI0seuysU2xz5WJDTuVl3LH/2d3FznlURH/o8v4es/+t1JHZQCdXFceSUmY","/_nuxt/CjuusA0M.js":"sha384-7QlkNUQvlOcVwGD//qSxpoi2R95bem7x7q/Rz3alnZ2hC5YL2g4XxSFZkcDmS/bx","/_nuxt/Cn9sHGYd.js":"sha384-/AGEiOMSo/6uUpHIAKo66fKyiwUaLc23Qk+nx7kdMQciTykzmyQ9r4s9SJE5RJBv","/_nuxt/CndJ1uqb.js":"sha384-LIC1wghB3g35C8z0p1Pzc8ncRgno99JrwI8ztrehOuzl8roQGM3/nRzpbbsJZxxM","/_nuxt/Cua_tMRI.js":"sha384-HiAVjCN1F0TIw3ztQVHD6zy5Y/9xsx17rTrE1aigdtUxJUPLdTn82nbJ9kPXc1Ht","/_nuxt/Cup6QpeV.js":"sha384-0IHL5Oc0dOS6FAh0hZEqf/esabkR8kTWyTxpIGS1+uiXAjC8++Uu7BbDZn0GWqUp","/_nuxt/CutsdmQO.js":"sha384-BbXFYwCNkKuohuOPLSmTWgREQNhZTYukUhWvwZR6vdu0WgK5ti6jBb5P77SQFA1B","/_nuxt/Cyu9clx1.js":"sha384-TU298Wp5hvPkR5S5o/pOXe6tbe7yCEWuYQ2oW6WrzeJaUlFQ9Iev20Taoh/OXjty","/_nuxt/D3Qa351f.js":"sha384-YnlmHyuCejIpHfCIOTReVXtSLdFv5EKhJngz7VaIb9snsmlgyauZc3LFMHbSEZHx","/_nuxt/D3qo6DvI.js":"sha384-RP5S1ZjWIR8xBYi5uW1mbzU+HJj4hIGRM/3NulMQ9JzJzKw3bVeek07Mmmj6fwm5","/_nuxt/D6EkA9Iu.js":"sha384-XHMnRwi5xNHtN0x65RWartilZQmb4WzsY2snoYmHuTvqrn9/lWHmjN/UAYqHbegs","/_nuxt/DA0SZYl8.js":"sha384-TTxTRxRa87+lkOVMArK/awtcaeSUGVof0qVk+iAwNOM5tV85oE+yyu/RZq1rtt8G","/_nuxt/DH3WMO_w.js":"sha384-Pj6IgJPj1aj/7P7O3OszmZQwpTzMh2+JIQZSfJLsREOpEHfeiKIZsD2hpgqXSlZH","/_nuxt/DHuO7-vr.js":"sha384-bs0tl/kMKF1cXhfBt9lT+5YUI2ONvmxAtZSnjzHxSJAnY8HjoGqPEQhrfhYW3YGk","/_nuxt/DIJV9JVE.js":"sha384-VQ03GgbZAvsHvl20nTaCpgMit23WWqX9whKBrY21i0O6Lmx83LfCckUHeuA7tKAf","/_nuxt/DLMcZJZL.js":"sha384-NesdScKlCQsjoK54Mr38vSn+FE1mQXGpfMYAbrWelyYpvuMeG7TA6XARuDbLfi08","/_nuxt/DMiKYFSt.js":"sha384-eiiBhuR4K/AA/VDrg931nzOz4EKaRjAq4j6ygnHdkbFkzNxQnl9kLvDA0kxeth41","/_nuxt/DNHHcrY4.js":"sha384-Sn83Ox3TjfNXsaTVC+nW2NIooX8NFYdOHP3vbTFB2rMOo2Clv/+4AyJrjVvII7+H","/_nuxt/DXCxdEoC.js":"sha384-kqDgN/9fam/GGemaIL01rYQ4YeXbmI0KC/Y8D5paHBRK+p2WyZ9Su/WDbkEYd1zx","/_nuxt/DXwe1W7z.js":"sha384-KpmDPhPv0pNNH71ihDTT5UQjnG8Su044VZBxrtHzpzottgiiWc3NHn+7J0/V7epl","/_nuxt/Dkx6sApZ.js":"sha384-773i6B+tYp0maem3Js+Wap4x8aKBr/SCZ4YQU7q6gNy/tC6hGviAg+im2hW4v0WK","/_nuxt/DlAUqK2U.js":"sha384-wV/FyIfkoKuneA9gx32UbcC1rWydYJhlr+cMCHu0oN57ZtVcBz8nUCI/A5rPOyHo","/_nuxt/DoUNaLx4.js":"sha384-JYJ7hILiXnpyRq2nY5yzm4rskME1X401QY94DDoS/rvSr5DJcIa/0Sz5G7/v5l8y","/_nuxt/DokuH998.js":"sha384-oVF7S6goe9WNMST+N73/+H2Idf/F8Y2GvMZq4XXsoF/Ouhe3nFrFShwJRIcupg12","/_nuxt/EM0UkkjL.js":"sha384-0NmIoZ6NSKw+avpfMqpuIJUuTYwAqR/RHRPB7iZzIbQc5KSbhuI+yAHgzTiR/5UN","/_nuxt/I2Jhpfv3.js":"sha384-ppnVKn7xsOgzxVjRtD4YuW8P0DWwH38hvwpESFeBqzOV+JQv1heUOqlRCwIER3pK","/_nuxt/TPS62zx_.js":"sha384-iDpxoy9XTmXHXjqKV7tnrBekesn8N4x8BuWML0wH4Tzyuy5eFzkdOheWmt+XT4Cv","/_nuxt/background-1.7KPBTySk.jpg":"sha384-BDkSvNRTeKczlCzBkpHuAKUegL9glTlC9hm7yHs51jXnwevvu85zKwSt+iY/OYi1","/_nuxt/color-tools.CjuWh_vT.css":"sha384-PFmTF+OnJU/nheJMIPEwqY4WhW04SuzLbYE0E2sZ+hsDXZ7RwLkbvCJBo/8RZtyF","/_nuxt/entry.Bd_gO-5g.css":"sha384-x6rtE0TKu1dUG1dAC8MroK8g5JmCQH0tF63KgJTzZguqJZAHx0MimHrPSZLx2qw2","/_nuxt/error-404.D8t3QiuX.css":"sha384-Zfp6PQ1cA5peci5JXlU87yKKv2etZuCEpFBR/Q3EqhPPNvWH0SY3X3g1hdKRu4cx","/_nuxt/error-500.CTSlSiFU.css":"sha384-NMuiFellyG5o4kpnu6d97WpdU5KNaU5ukDvJgrsiw/8EMrr56xmlW4hbdqEKxxYW","/_nuxt/error.D60QVBfX.css":"sha384-2DijUtHXDEjWRqXZbNphWeffvzbUlpk3MFGtNsVgyYsmZrmRKxcj+Qig0yYCjXho","/_nuxt/fQA4vaDy.js":"sha384-LGK/F5IC0podZF8ohhUh9MkoDpWBXPxyHuZXHNTXt27jqVS6e8fQhP5MRi5qeS0z","/_nuxt/geist-cyrillic-ext-wght-normal.DjL33-gN.woff2":"sha384-wxwSaC8+DfHON7uHVUNSuT1z9tSGiolmg1s5LLjZEej8gCzOYaNWSDEAi8dcyR4A","/_nuxt/geist-cyrillic-wght-normal.BEAKL7Jp.woff2":"sha384-opvqPM26rj609u7iTam/9OsQP3MY1nx+XAjmV00igjYUOO8MsJrznCM7IKVvGmbT","/_nuxt/geist-latin-ext-wght-normal.DC-KSUi6.woff2":"sha384-SbY0HmKyF7Y5RtP5s7Hx15oXLhMwA4T6j2458o3MNGE6PQQJOwUVJps3G7Sd/hsf","/_nuxt/geist-latin-wght-normal.BgDaEnEv.woff2":"sha384-tOfKDG7slrKYWpwldbm4WtA1FznOX7wj5pBF8ay9j7fVmyOqKahOgmnsaPH/35Rh","/_nuxt/geist-vietnamese-wght-normal.6IgcOCM7.woff2":"sha384-KpJQhQ2JGCRcQL5FFAvAFJIahSRlSVDL35ymna3gtV/uuOSC1sICt+CU4CkOe/2H","/_nuxt/hanken-grotesk-latin-400-normal.BG6hkEXj.woff2":"sha384-swtRzCzR/B/QU/+t0y5GXqx5yXWJNgbZCKpW+jISW+P9+/ALRKFqBjHZPkIUMxBS","/_nuxt/hanken-grotesk-latin-400-normal.CjyVwvJV.woff":"sha384-1vPk3Wn/JJS7rbZtSewzE6dr8k0duww50TSf9z25AgFHWRmEGf282EmEjcsVquUe","/_nuxt/hanken-grotesk-latin-600-normal.CIXX6EOa.woff2":"sha384-GCtbIWtw6ac+II9tcjrqo2z5xOOZxAykVWievl3MWNjIJx5K+Q8xi8P6QzCiWRDs","/_nuxt/hanken-grotesk-latin-600-normal.NEn2C4Q3.woff":"sha384-xN4YqCoaRWeNwjTiItsHkg9nPAJQta74+EMW82TnwEPczq8JuXE2cVjdzw9kBBAv","/_nuxt/hanken-grotesk-latin-ext-400-normal.DI-aIsWt.woff":"sha384-Aa/FxuSux3vuq6128QtXoYWgVfUEie+G3bRtIGv2+XDf99illSmayys2D48orEvg","/_nuxt/hanken-grotesk-latin-ext-400-normal.DR7lHpW4.woff2":"sha384-xXI6JztyEvLzf7LbZAD3dPYCJCX1E5IG6CxKKjSnWaRbSFIalCcrdnZpIPuv+SGZ","/_nuxt/hanken-grotesk-latin-ext-600-normal.DHIm05DD.woff":"sha384-nK6gchN10gtqA5O2ABSK6DqMT1C02IeddQHXr0nExeGK7uGlbKIX5QGKUM96Ki2v","/_nuxt/hanken-grotesk-latin-ext-600-normal.FY8kSObK.woff2":"sha384-kdVinu2Ng3U1Qcpb5JDSQm9zcX02HRpJogNPhnS55xI+RJRxLeFvlvmLGmZ7puBz","/_nuxt/hanken-grotesk-vietnamese-400-normal.BLrFBAHj.woff2":"sha384-0gkrJQXxM1R0M86dpL1d1aiDsln0bXdqh7xPDFMAyFzK/o627iqE0ym783O1Uvfn","/_nuxt/hanken-grotesk-vietnamese-400-normal.C-iWyKLC.woff":"sha384-DSXR3zdBTeXCrK+ZmqP0Gdq/AJuRm8gB/3fOP+KoRaGK9gpUdRH714z3o2NAAvwI","/_nuxt/hanken-grotesk-vietnamese-600-normal.Cp8QQjQf.woff2":"sha384-ps6Uk5nJpRf88gHj5AP44+NaIdOatj0+wK/O2/tg8XntD1EBJSkos4IbFbH3GOFa","/_nuxt/hanken-grotesk-vietnamese-600-normal.DHaFH8q1.woff":"sha384-PCm50671v3/6ZakMkGSbtLHqgxEOyf17Jl5tU5WSfyeGzBLsiPQ7tIjgAYZiYsVU","/_nuxt/index.DTmr2tDz.css":"sha384-SO/+ol1yokNt4TZNUv+iwLP04xrJdp85mTzZiYqVkG6vH9qDhWqM1YEG4Qjavi9+","/_nuxt/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2":"sha384-qluah8BEtylNQxpBX87jwjxZYpCpP0Q1dxT++wUUWxAtUvYMoa1iwGMPAA9k11wG","/_nuxt/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff":"sha384-NBb5AxBDBD4FQShlBfAqjcAm+dYbxiR/fsjCgoKCkbEn867oseTlAH8kn79OWIVd","/_nuxt/jetbrains-mono-cyrillic-600-normal.8K4wrrwR.woff":"sha384-qs07FvSaz7CGk0gBq8RGJNNkni44dCorpA0/EbEbXt5GdUP2c62klaBjZ3UwDBk8","/_nuxt/jetbrains-mono-cyrillic-600-normal.EVf6-Yzo.woff2":"sha384-rU60BLYZUl8KenLDNNx8nn9gmwq/wtO3jqwwbUH6/lmBMDxY9JVtRQ20+EIjXW7B","/_nuxt/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff":"sha384-+MqYgReQ/dIJR42t7DrSzoKn1Ah6O9n6PSaVQqK+cXx2YY2YxeQFMsLwa/Bnkfpo","/_nuxt/jetbrains-mono-greek-400-normal.C190GLew.woff2":"sha384-TST8acpoDLWuAcKbzQBIyya/NuWhRa7dcbErQruVYV2FUXYZhEm/tvxxOtakrqr5","/_nuxt/jetbrains-mono-greek-600-normal.H7WoG9Et.woff2":"sha384-xajaUSjw7k0ZxI3dcy2qATI57aCDFgEVZN74c2Q2OWunKAThQTa+WKIgOeIIvq4E","/_nuxt/jetbrains-mono-greek-600-normal.mc2nkWzM.woff":"sha384-pNCWVqj01GMMW2J6gpV7O1EPLsOLjgR8Oif2g6Hlq6loLkUlfs9B1N50RrIC7wab","/_nuxt/jetbrains-mono-latin-400-normal.6-qcROiO.woff":"sha384-1CUFiITvZLNauEQJOeFBLZzcxV2YLQP/Hc/2n36BQE6G59ubCzUM3hKEHrhVBn15","/_nuxt/jetbrains-mono-latin-400-normal.V6pRDFza.woff2":"sha384-/4dCc3INKaFZBsZMku6bd44i8Gr1uXW1GYvdcNjsbHXHh2nGnk9G4RAhHf8hx3GT","/_nuxt/jetbrains-mono-latin-600-normal.BfsvjouI.woff":"sha384-3QieJqNMuBvSFIvmwf3+qsnhWia6yIJuxQWXcsbY52OPZe0SzX24UGKCoDIge2Jz","/_nuxt/jetbrains-mono-latin-600-normal.C8RAYTDA.woff2":"sha384-CJcnMceWe1sniaYjmkgYIY3CKU5deQQZc389ekYG19zjKrIwnEmdCyVrjyXxdad+","/_nuxt/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2":"sha384-E1WjAekX0jixTGufYdFaoed7qOtaE1fF43ZvIs2C2D1IGhT8T2cjgEQ2Dd+1IjdS","/_nuxt/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff":"sha384-6uEIfL/EhFb8qIHltY0id6HxciglWwhV+ktuwYA7VivL4BgBfwAFkiUg5Y8Dy9FV","/_nuxt/jetbrains-mono-latin-ext-600-normal.BfB_LPfz.woff2":"sha384-oNXDgOFgzOJzGS7Ghm+ooFqKI92LIY0NSxyEDge9Bqsa6Pde9rZU2TnS0Pf8LOr2","/_nuxt/jetbrains-mono-latin-ext-600-normal.DObL3zCW.woff":"sha384-ITVUkkKuTdadybHZJPHSSha2qG8+hRISgJ9wlxBTUNVp9v0pZ5sYcwyXCZN2CUSy","/_nuxt/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff":"sha384-Dw/AIiC8MevXacPGHREzXNTWtKZzGb54NBDFs6i63/It1KHLxaaChbPPbP1YPde5","/_nuxt/jetbrains-mono-vietnamese-600-normal.OWROknRo.woff":"sha384-64+tSHtD20y+tMxr1hXBVtVDg/puPVx2C6eJU1BfSO/Wjn8jV3xSzijzXca7neRV","/_nuxt/juan-image.CDKdi2wW.png":"sha384-1ZrT/eSplZOF2K1To8SXirBxOODOtFIUSbZSkzs3I4rP+tuMBFiPnufp6ENLqKLg","/_nuxt/mJMxNgxo.js":"sha384-xbRhuL9lzB7F3kRKcllCJ4H9VskTTrSyKFi5MceEwAVNdVeZQThulHmTPwa8wOlv","/_nuxt/o7wFE2--.js":"sha384-LariAg6DxCMdazzc3iddxyROGri0oulYNot7vDrI43VKakHCfTXn10v70pR90t58","/_nuxt/ogmiQTWH.js":"sha384-tecqBhHc9iJSqy7pJp8uMub+ApSXySJjIn+PAFWdpXy8Qe5mKVhf5WXxvt0HE63s","/_nuxt/products.Dl4-8F_N.css":"sha384-Rs0jB+5z90fzsZV2UHIEqUzfI1MebY9/IUlx9n72sR1oXZK2agvVwzDQqJY07ZtG","/_nuxt/qQI07767.js":"sha384-kckQjk6evA2BiM3ghqrNls6thsBo6LZz886KC4kuexuu9sJQHYcWMBMWzNIm0Rkn","/_nuxt/sCgDY9ex.js":"sha384-gIFzIkUXtRG2wcA4gwldhg4uX17OyiA1lZIz1a2fvizmLtTlYvxB5t0ruQeH2k2D","/_nuxt/sNfuOFWG.js":"sha384-YzOCx4jXYkSmYiP1rvOUpNbcpNUuWkgK1IdUxJGQCV9oTbO21hSFUWavTSmfSRj7","/Juan -amon-Labrada-Estrada-Developer-Vue-202111.pdf":"sha384-JfxzrFiZlavCIIuDRcxqu3kVwUlrEn3qxG6mz15kuWvS0Y0h1E4qxgvwMARCujRX","/Juan-Ramon-Labrada-Estrada-Developer-Vue-202301.pdf":"sha384-EZtB1XN+ymC79wkG8MYxTxHZeQzUeTaZH+NTuitoppPvNxfRVSQcyf5hDxLcJlIn","/android-chrome-192x192.png":"sha384-ksPO+9dSW0vKdbCqwFEDj6iETUmEDEDgLg1ZMi7oHar634ixL949OxkuFWAt0HcV","/android-chrome-512x512.png":"sha384-JAPYWQhaC01F8meeS+VBLyjGFbgZ50a5oh0GTfqqZvuFR9nx4/tDLyDxDCW0RiUQ","/apple-touch-icon.png":"sha384-mSC7rR1je0rspiR+yH3lTCT5EHRzA4sY/uvt+R6/ieI4ENoAsye3vdFuGbtGaXKF","/favicon-16x16.png":"sha384-7F6CKcyW6RPVrq6RKhUdL5J7Z0fiTYgq9ZwT6cJxGmFzrB6EVbHsTGMzcYUhfHiZ","/favicon-32x32.png":"sha384-mOIbt13chJ8sx5r0AbyZ410n3kQwwp0qiD5KOKmDLAaU1B4zIM1mX0Ay3AZqXcLF","/test.html":"sha384-SqLjml2zP/qUCjZwIgEhD82kqY6aC40qgQraYHeQUaOIa0np6NsnVpKB2Viw/HfP"};

const SCRIPT_RE$1 = /<script((?=[^>]+\bsrc="([^"]+)")(?![^>]+\bintegrity="[^"]+")[^>]+)(?:\/>|><\/script>)/g;
const LINK_RE$1 = /<link((?=[^>]+\brel="(?:stylesheet|preload|modulepreload)")(?=[^>]+\bhref="([^"]+)")(?![^>]+\bintegrity="[\w\-+/=]+")[^>]+)>/g;
const _q9J07mwzfSHgGhTaT041yA3INc9Z6R7qbdiS3mgxX0 = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.sri) {
      return;
    }
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => {
        if (typeof element !== "string") {
          return element;
        }
        element = element.replace(SCRIPT_RE$1, (match, rest, src) => {
          const hash = sriHashes[src];
          if (hash) {
            const integrityScript = `<script integrity="${hash}"${rest}><\/script>`;
            return integrityScript;
          } else {
            return match;
          }
        });
        element = element.replace(LINK_RE$1, (match, rest, href) => {
          const hash = sriHashes[href];
          if (hash) {
            const integrityLink = `<link integrity="${hash}"${rest}>`;
            return integrityLink;
          } else {
            return match;
          }
        });
        return element;
      });
    }
  });
});

function generateRandomNonce() {
  const array = new Uint8Array(18);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));
  return nonce;
}

const _x773A8mGEw7ZUPx7yAVIYdk9zDpPzoqQSMKmlXks154 = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

const LINK_RE = /<link\b([^>]*?>)/gi;
const NONCE_RE = /nonce="[^"]+"/i;
const SCRIPT_RE = /<script\b([^>]*?>)/gi;
const STYLE_RE = /<style\b([^>]*?>)/gi;
const QUOTE_MASK_RE = /"([^"]*)"/g;
const QUOTE_RESTORE_RE = /__QUOTE_PLACEHOLDER_(\d+)__/g;
function injectNonceToTags(element, nonce) {
  if (typeof element !== "string") {
    return element;
  }
  const quotes = [];
  let maskedElement = element.replace(QUOTE_MASK_RE, (match) => {
    quotes.push(match);
    return `__QUOTE_PLACEHOLDER_${quotes.length - 1}__`;
  });
  maskedElement = maskedElement.replace(LINK_RE, (match, rest) => {
    if (NONCE_RE.test(rest)) {
      return match.replace(NONCE_RE, `nonce="${nonce}"`);
    }
    return `<link nonce="${nonce}"` + rest;
  });
  maskedElement = maskedElement.replace(SCRIPT_RE, (match, rest) => {
    return `<script nonce="${nonce}"` + rest;
  });
  maskedElement = maskedElement.replace(STYLE_RE, (match, rest) => {
    return `<style nonce="${nonce}"` + rest;
  });
  const restoredHtml = maskedElement.replace(QUOTE_RESTORE_RE, (match, index) => {
    return quotes[parseInt(index, 10)];
  });
  return restoredHtml;
}
const _JiEJUNTSyIJ6JAEIyNpBjK0UYhIUleRXFtJG02fov8c = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    if (event.context.security?.nonce) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.nonce && true) {
      const nonce = generateRandomNonce();
      event.context.security.nonce = nonce;
    }
  });
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const rules = resolveSecurityRules(event);
    if (!rules.enabled || !rules.headers || !rules.headers.contentSecurityPolicy || !rules.nonce) {
      return;
    }
    const nonce = event.context.security.nonce;
    const sections = ["body", "bodyAppend", "bodyPrepend", "head"];
    for (const section of sections) {
      html[section] = html[section].map((element) => injectNonceToTags(element, nonce));
    }
  });
});

const _E0lVf3YvGdJKrvCD7PjaKXiBTAAuE8mx43432ihAO8k = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (response, { event }) => {
    if (response.island) {
      return;
    }
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      if (headers.contentSecurityPolicy) {
        const csp = headers.contentSecurityPolicy;
        const nonce = event.context.security?.nonce;
        const scriptHashes = event.context.security?.hashes?.script;
        const styleHashes = event.context.security?.hashes?.style;
        headers.contentSecurityPolicy = updateCspVariables(csp, nonce, scriptHashes, styleHashes);
      }
    }
  });
});
function updateCspVariables(csp, nonce, scriptHashes, styleHashes) {
  const generatedCsp = Object.fromEntries(Object.entries(csp).map(([directive, value]) => {
    if (typeof value === "boolean") {
      return [directive, value];
    }
    const sources = typeof value === "string" ? value.split(" ").map((token) => token.trim()).filter((token) => token) : value;
    const modifiedSources = sources.filter((source) => {
      if (source.startsWith("'nonce-") && source !== "'nonce-{{nonce}}'") {
        console.warn("[nuxt-security] removing static nonce from CSP header");
        return false;
      }
      return true;
    }).map((source) => {
      if (source === "'nonce-{{nonce}}'") {
        return nonce ? `'nonce-${nonce}'` : "";
      } else {
        return source;
      }
    }).filter((source) => source);
    if (["script-src", "script-src-elem"].includes(directive) && scriptHashes) {
      modifiedSources.push(...scriptHashes);
    }
    if (["style-src", "style-src-elem"].includes(directive) && styleHashes) {
      modifiedSources.push(...styleHashes);
    }
    return [directive, modifiedSources];
  }));
  return generatedCsp;
}

const _YUMBG0G4b954QeAs9r0awIt_rILIthLxUC_cbpZvlxw = defineNitroPlugin((nitroApp) => {
  {
    return;
  }
});

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse(body, boundary);
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr$1(body, { strict });
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    appendResponseHeader(event, name, value);
  }
}
const appendHeaders = appendResponseHeaders;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}

function resolveCorsOptions(options = {}) {
  const defaultOptions = {
    origin: "*",
    methods: "*",
    allowHeaders: "*",
    exposeHeaders: "*",
    credentials: false,
    maxAge: false,
    preflight: {
      statusCode: 204
    }
  };
  return defu(options, defaultOptions);
}
function isPreflightRequest(event) {
  const origin = getRequestHeader(event, "origin");
  const accessControlRequestMethod = getRequestHeader(
    event,
    "access-control-request-method"
  );
  return event.method === "OPTIONS" && !!origin && !!accessControlRequestMethod;
}
function isCorsOriginAllowed(origin, options) {
  const { origin: originOption } = options;
  if (!origin || !originOption || originOption === "*" || originOption === "null") {
    return true;
  }
  if (Array.isArray(originOption)) {
    return originOption.some((_origin) => {
      if (_origin instanceof RegExp) {
        return _origin.test(origin);
      }
      return origin === _origin;
    });
  }
  return originOption(origin);
}
function createOriginHeaders(event, options) {
  const { origin: originOption } = options;
  const origin = getRequestHeader(event, "origin");
  if (!origin || !originOption || originOption === "*") {
    return { "access-control-allow-origin": "*" };
  }
  if (typeof originOption === "string") {
    return { "access-control-allow-origin": originOption, vary: "origin" };
  }
  return isCorsOriginAllowed(origin, options) ? { "access-control-allow-origin": origin, vary: "origin" } : {};
}
function createMethodsHeaders(options) {
  const { methods } = options;
  if (!methods) {
    return {};
  }
  if (methods === "*") {
    return { "access-control-allow-methods": "*" };
  }
  return methods.length > 0 ? { "access-control-allow-methods": methods.join(",") } : {};
}
function createCredentialsHeaders(options) {
  const { credentials } = options;
  if (credentials) {
    return { "access-control-allow-credentials": "true" };
  }
  return {};
}
function createAllowHeaderHeaders(event, options) {
  const { allowHeaders } = options;
  if (!allowHeaders || allowHeaders === "*" || allowHeaders.length === 0) {
    const header = getRequestHeader(event, "access-control-request-headers");
    return header ? {
      "access-control-allow-headers": header,
      vary: "access-control-request-headers"
    } : {};
  }
  return {
    "access-control-allow-headers": allowHeaders.join(","),
    vary: "access-control-request-headers"
  };
}
function createExposeHeaders(options) {
  const { exposeHeaders } = options;
  if (!exposeHeaders) {
    return {};
  }
  if (exposeHeaders === "*") {
    return { "access-control-expose-headers": exposeHeaders };
  }
  return { "access-control-expose-headers": exposeHeaders.join(",") };
}
function appendCorsPreflightHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
  appendHeaders(event, createMethodsHeaders(options));
  appendHeaders(event, createAllowHeaderHeaders(event, options));
}
function appendCorsHeaders(event, options) {
  appendHeaders(event, createOriginHeaders(event, options));
  appendHeaders(event, createCredentialsHeaders(options));
  appendHeaders(event, createExposeHeaders(options));
}

function handleCors(event, options) {
  const _options = resolveCorsOptions(options);
  if (isPreflightRequest(event)) {
    appendCorsPreflightHeaders(event, options);
    sendNoContent(event, _options.preflight.statusCode);
    return true;
  }
  appendCorsHeaders(event, options);
  return false;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

const _Wn3WM8rrx4AmgslXiljebwo7nTuzM8dScMPIm_9T3_A = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response, { event }) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.headers) {
      const headers = rules.headers;
      Object.entries(headers).forEach(([header, value]) => {
        const headerName = getNameFromKey(header);
        if (value === false) {
          const { headers: standardHeaders } = getRouteRules(event);
          const standardHeaderValue = standardHeaders?.[headerName];
          const currentHeaderValue = getResponseHeader(event, headerName);
          if (standardHeaderValue === currentHeaderValue) {
            removeResponseHeader(event, headerName);
          }
        } else {
          const headerValue = headerStringFromObject(header, value);
          setResponseHeader(event, headerName, headerValue);
        }
      });
    }
  });
});

const _D2rpFXC_d9oGTxlst6KfS7IgHysPhYPb3QXZFI7PHM = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    const rules = resolveSecurityRules(event);
    if (rules.enabled && rules.hidePoweredBy && !event.node.res.headersSent) {
      removeResponseHeader(event, "x-powered-by");
    }
  });
});

const _3f_bvJccwxaKWzFpZVUmi9yyB2VdlDzh8_V0QrPqg = defineNitroPlugin(async (nitroApp) => {
  {
    const prerenderedHeaders = await useStorage("assets:nuxt-security").getItem("headers.json") || {};
    nitroApp.hooks.hook("beforeResponse", (event) => {
      const rules = resolveSecurityRules(event);
      if (rules.enabled && rules.ssg && rules.ssg.nitroHeaders) {
        const path = event.path.split("?")[0];
        if (path && prerenderedHeaders[path]) {
          setResponseHeaders(event, prerenderedHeaders[path]);
        }
      }
    });
  }
});

const plugins = [
  _2kJDOfSuEPEYJfdGW3Tikb9JPPThbNP6rRRP3aRULyo,
_q9J07mwzfSHgGhTaT041yA3INc9Z6R7qbdiS3mgxX0,
_x773A8mGEw7ZUPx7yAVIYdk9zDpPzoqQSMKmlXks154,
_JiEJUNTSyIJ6JAEIyNpBjK0UYhIUleRXFtJG02fov8c,
_E0lVf3YvGdJKrvCD7PjaKXiBTAAuE8mx43432ihAO8k,
_YUMBG0G4b954QeAs9r0awIt_rILIthLxUC_cbpZvlxw,
_Wn3WM8rrx4AmgslXiljebwo7nTuzM8dScMPIm_9T3_A,
_D2rpFXC_d9oGTxlst6KfS7IgHysPhYPb3QXZFI7PHM,
_3f_bvJccwxaKWzFpZVUmi9yyB2VdlDzh8_V0QrPqg
];

const assets = {
  "/Juan -amon-Labrada-Estrada-Developer-Vue-202111.pdf": {
    "type": "application/pdf",
    "etag": "\"bfc0-HUhMB/eGW+aj8bK6GTVqlAvFc98\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 49088,
    "path": "../public/Juan -amon-Labrada-Estrada-Developer-Vue-202111.pdf"
  },
  "/Juan-Ramon-Labrada-Estrada-Developer-Vue-202301.pdf": {
    "type": "application/pdf",
    "etag": "\"c783-8UaK+Q+V0uvYYu5h/qQrXV/LldU\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 51075,
    "path": "../public/Juan-Ramon-Labrada-Estrada-Developer-Vue-202301.pdf"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"3b6-Q3yD8e5V+lwazM1PzzXkt3scFyg\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 950,
    "path": "../public/favicon-16x16.png"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"12054-3NmG8YMuhDkKP3v/m3FUneJ25GY\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 73812,
    "path": "../public/android-chrome-192x192.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"bf6-EH8TXjjr+0ejAfOxTk0ipc4wD9U\"",
    "mtime": "2026-07-18T01:51:01.498Z",
    "size": 3062,
    "path": "../public/favicon-32x32.png"
  },
  "/test.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"114-kZ9wLNAK7VGhK1D/S3lv2/sTFec\"",
    "mtime": "2026-07-18T01:51:01.498Z",
    "size": 276,
    "path": "../public/test.html"
  },
  "/analytics/analytics.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8d7-StRpudU9Jn9sPBVuKSk0zY2lLpk\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 2263,
    "path": "../public/analytics/analytics.js"
  },
  "/jobs/Impactia.png": {
    "type": "image/png",
    "etag": "\"3393-nKDit0igcTEweq9SiZMsM9Hpa5I\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 13203,
    "path": "../public/jobs/Impactia.png"
  },
  "/jobs/bicevida.png": {
    "type": "image/png",
    "etag": "\"1c46-0J5j4+ARffJQI2gGwJqJlqXgPok\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 7238,
    "path": "../public/jobs/bicevida.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"1028e-II0IHH16KT5hvxqG7KDIQmf9yEg\"",
    "mtime": "2026-07-18T01:51:01.498Z",
    "size": 66190,
    "path": "../public/apple-touch-icon.png"
  },
  "/jobs/bicevida.svg": {
    "type": "image/svg+xml",
    "etag": "\"7d7-mF5UEr57PAfVeIA7cNPSCg1N9pA\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 2007,
    "path": "../public/jobs/bicevida.svg"
  },
  "/jobs/cubacel_logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"2916-vnsLczgGad8rhGMwg8n2qFvszT8\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 10518,
    "path": "../public/jobs/cubacel_logo.jpg"
  },
  "/jobs/experian.png": {
    "type": "image/png",
    "etag": "\"61f-lPrzntGYdX2JWUEErx2SbxUTcU4\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 1567,
    "path": "../public/jobs/experian.png"
  },
  "/jobs/monetizemore.png": {
    "type": "image/png",
    "etag": "\"a1a-c4fUHHUu3FCwU/ZeC+Og0sNaWmc\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 2586,
    "path": "../public/jobs/monetizemore.png"
  },
  "/jobs/onrm-logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"3eea-zTNCeI0bOMJWgNRJvcH7lkCUWvg\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 16106,
    "path": "../public/jobs/onrm-logo.jpg"
  },
  "/jobs/seguros-falabella.png": {
    "type": "image/png",
    "etag": "\"27a1-UTQI5cZ3cX6CONNdj52aDkgzKo0\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 10145,
    "path": "../public/jobs/seguros-falabella.png"
  },
  "/jobs/seguros-falabella.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fa2-8W6Fwqvs7YvKOVCaUhNCgX7Kcac\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 16290,
    "path": "../public/jobs/seguros-falabella.svg"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"69ef6-MNKu2o3BkKv/ab0QifthTQO9HAA\"",
    "mtime": "2026-07-18T01:51:01.498Z",
    "size": 433910,
    "path": "../public/android-chrome-512x512.png"
  },
  "/jobs/wplex.png": {
    "type": "image/png",
    "etag": "\"3f95-dYaDLIpTSw/RGhOo6psu/TSKN3M\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 16277,
    "path": "../public/jobs/wplex.png"
  },
  "/jobs/team-using-kanban.png": {
    "type": "image/png",
    "etag": "\"2e382-pKMmjUTAf0dtlW7BpglZ4w8Kw90\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 189314,
    "path": "../public/jobs/team-using-kanban.png"
  },
  "/images/1015-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"6af5-9X2pPnIh6QHnBTDezKOEx2pbJhY\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 27381,
    "path": "../public/images/1015-400x400.jpg"
  },
  "/images/1020-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d4a-eQ3rV21piy8/44jymp2Fm+9qw0I\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 23882,
    "path": "../public/images/1020-400x400.jpg"
  },
  "/images/1016-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"789a-Rm9MWGkmnUOXzoA68MrGcQnAC0A\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 30874,
    "path": "../public/images/1016-400x400.jpg"
  },
  "/jobs/software-developer.png": {
    "type": "image/png",
    "etag": "\"3871d-Tvf/apdaftp2vnAJfwlY1blWBqQ\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 231197,
    "path": "../public/jobs/software-developer.png"
  },
  "/jobs/juan-image.png": {
    "type": "image/png",
    "etag": "\"163ef5-Et+nldSCqMRZa6j8/wNeFy+k1SA\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 1457909,
    "path": "../public/jobs/juan-image.png"
  },
  "/images/1028-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f46-M+kzxdIO8wxdWVE4Sloetle10tY\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 16198,
    "path": "../public/images/1028-400x400.jpg"
  },
  "/images/1039-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"770c-87Bv9bj7owFuWKwbZbo4tWHss9A\"",
    "mtime": "2026-07-18T01:51:01.350Z",
    "size": 30476,
    "path": "../public/images/1039-400x400.jpg"
  },
  "/images/1057-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"5677-Y4pMrx3XbdW3tQvUwIH/r9N0SbA\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 22135,
    "path": "../public/images/1057-400x400.jpg"
  },
  "/images/1047-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"80cd-jB1gj+8kwmJ71m6gnxXtghwKqj0\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 32973,
    "path": "../public/images/1047-400x400.jpg"
  },
  "/images/106-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"6887-yGdu0pGgQSpkkdsjRgRr4YZMimg\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 26759,
    "path": "../public/images/106-400x400.jpg"
  },
  "/images/110-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"7317-A7dVbYUg9xO7KILeNu+WftMpPpU\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 29463,
    "path": "../public/images/110-400x400.jpg"
  },
  "/images/136-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"6992-/O+/4r/Sk14Bzi+dFoQ84Nc34Uc\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 27026,
    "path": "../public/images/136-400x400.jpg"
  },
  "/images/15-400x400.jpg": {
    "type": "image/jpeg",
    "etag": "\"9659-6FDNMJKAS+a/67zGSWAuy1jvA1Y\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 38489,
    "path": "../public/images/15-400x400.jpg"
  },
  "/images/juanlabrada_logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"1a74-d1jeLG/0Nb5U5nsV7BaObrbBFzI\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 6772,
    "path": "../public/images/juanlabrada_logo.jpg"
  },
  "/certificates/cert-claude-api.png": {
    "type": "image/png",
    "etag": "\"a872-x27pf2jb8AqPGPfaQQeRN2GLB84\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 43122,
    "path": "../public/certificates/cert-claude-api.png"
  },
  "/certificates/cert-ai-fluency.png": {
    "type": "image/png",
    "etag": "\"cbe9-iHk1ukgwivm9HSEmGYyWyQK92f0\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 52201,
    "path": "../public/certificates/cert-ai-fluency.png"
  },
  "/certificates/cert-introduction-subagents.png": {
    "type": "image/png",
    "etag": "\"a7de-HDcWp9ccO28cy3zBXBtbxwUDVNs\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 42974,
    "path": "../public/certificates/cert-introduction-subagents.png"
  },
  "/logos/AdManager.png": {
    "type": "image/png",
    "etag": "\"90a6-quK2p4BuNcts+L1DXCa69Yh5kNs\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 37030,
    "path": "../public/logos/AdManager.png"
  },
  "/certificates/cert-coursera-ai-llms.png": {
    "type": "image/png",
    "etag": "\"3a844-7rC2kUes9uGnE+qRj0Qf8M4xoF4\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 239684,
    "path": "../public/certificates/cert-coursera-ai-llms.png"
  },
  "/certificates/cert-mcp-anthropic.png": {
    "type": "image/png",
    "etag": "\"e0aa-yQ5yYlx+yXgysOlMd/cVqWH0XGk\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 57514,
    "path": "../public/certificates/cert-mcp-anthropic.png"
  },
  "/logos/ChromeExtension.png": {
    "type": "image/png",
    "etag": "\"bbc5-xcS92PMLOf26XZyLsJ68VaP+cVM\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 48069,
    "path": "../public/logos/ChromeExtension.png"
  },
  "/logos/IbmAix.webp": {
    "type": "image/webp",
    "etag": "\"33b2-9ZumwBQ/xOkHbKcaFipzUAkEGHI\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 13234,
    "path": "../public/logos/IbmAix.webp"
  },
  "/logos/DotNet.png": {
    "type": "image/png",
    "etag": "\"1092c-m8gqB2VCUGHCPVC/sCPuL8dBWCg\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 67884,
    "path": "../public/logos/DotNet.png"
  },
  "/certificates/cert-langgraph.png": {
    "type": "image/png",
    "etag": "\"179b5-AQHgW/TMhyVLZpSjgSDcSeeKCs0\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 96693,
    "path": "../public/certificates/cert-langgraph.png"
  },
  "/logos/ExtremeProgramming.png": {
    "type": "image/png",
    "etag": "\"1494a-mPBTUGstpRgy0hQukX0ukQN6Tj8\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 84298,
    "path": "../public/logos/ExtremeProgramming.png"
  },
  "/images/20230725_155258.jpg": {
    "type": "image/jpeg",
    "etag": "\"b437a-kT/QTV7tQTWe9Vk0c3TvehUSu5c\"",
    "mtime": "2026-07-18T01:51:01.354Z",
    "size": 738170,
    "path": "../public/images/20230725_155258.jpg"
  },
  "/logos/TDD2.webp": {
    "type": "image/webp",
    "etag": "\"6c3c-eIYF5fGhL8WoyzW+Tm86qFRxNQw\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 27708,
    "path": "../public/logos/TDD2.webp"
  },
  "/images/hero-image-vue.png": {
    "type": "image/png",
    "etag": "\"1609a8-+rbiE0D9l9dvT1/FfsBqIIWUoLc\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 1444264,
    "path": "../public/images/hero-image-vue.png"
  },
  "/images/juan-image.png": {
    "type": "image/png",
    "etag": "\"163ef5-Et+nldSCqMRZa6j8/wNeFy+k1SA\"",
    "mtime": "2026-07-18T01:51:01.358Z",
    "size": 1457909,
    "path": "../public/images/juan-image.png"
  },
  "/logos/agile.png": {
    "type": "image/png",
    "etag": "\"7f90-fqD0Ddm3lH8gmmz9sWrDwjQSIvU\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 32656,
    "path": "../public/logos/agile.png"
  },
  "/logos/agile2.png": {
    "type": "image/png",
    "etag": "\"6259-/G0NUtLO5DTcC2QjqVapBqZPZhY\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 25177,
    "path": "../public/logos/agile2.png"
  },
  "/logos/aws.png": {
    "type": "image/png",
    "etag": "\"8771-tM0wd3qMX1staz3utdWcpaEDeIg\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 34673,
    "path": "../public/logos/aws.png"
  },
  "/logos/c.png": {
    "type": "image/png",
    "etag": "\"6b79-0ti4HRwVWWElhYgIQQ253E3kEs8\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 27513,
    "path": "../public/logos/c.png"
  },
  "/logos/ci.png": {
    "type": "image/png",
    "etag": "\"a699-nM3mF/rfMZLShR8Q5VM5C/0xCy8\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 42649,
    "path": "../public/logos/ci.png"
  },
  "/logos/confluence.png": {
    "type": "image/png",
    "etag": "\"3a74-zPNTyGIEwboHlzLcF9JCtss+VAI\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 14964,
    "path": "../public/logos/confluence.png"
  },
  "/logos/cplusplus.png": {
    "type": "image/png",
    "etag": "\"6535-T7g0PmQujitu3LMk0G9mtZ4J4QY\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 25909,
    "path": "../public/logos/cplusplus.png"
  },
  "/logos/csharp.png": {
    "type": "image/png",
    "etag": "\"5c89-nEDyhP3+7YtejBH2MAERuseCkg0\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 23689,
    "path": "../public/logos/csharp.png"
  },
  "/logos/backlog.png": {
    "type": "image/png",
    "etag": "\"1b080-xpRuug5RxIiLWISk1ctAR3/vcis\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 110720,
    "path": "../public/logos/backlog.png"
  },
  "/logos/css.png": {
    "type": "image/png",
    "etag": "\"51f3-YPx5wbb6wmczUPckpaiRla+RnDI\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 20979,
    "path": "../public/logos/css.png"
  },
  "/logos/db2.png": {
    "type": "image/png",
    "etag": "\"4aad-waYMcCJrMEHV1T0CP5QBkRFYaJU\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 19117,
    "path": "../public/logos/db2.png"
  },
  "/logos/docker.png": {
    "type": "image/png",
    "etag": "\"10df-c2xC5E5EVgtHUA9zdPjKwtt1aA0\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 4319,
    "path": "../public/logos/docker.png"
  },
  "/logos/git.png": {
    "type": "image/png",
    "etag": "\"11d91-vMIvMGX7MLQvSm0pai9JO8Ag9dQ\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 73105,
    "path": "../public/logos/git.png"
  },
  "/logos/heroku.png": {
    "type": "image/png",
    "etag": "\"402e-IEO+aJSU0TqwKkISWpGKJfPnZcc\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 16430,
    "path": "../public/logos/heroku.png"
  },
  "/logos/java.png": {
    "type": "image/png",
    "etag": "\"b2b2-+GLaupw9ouZzJJq65B1/Bo03l28\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 45746,
    "path": "../public/logos/java.png"
  },
  "/logos/javascript.png": {
    "type": "image/png",
    "etag": "\"ae55-NnUtK2O3mJNxABDAQ4G3liCrpys\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 44629,
    "path": "../public/logos/javascript.png"
  },
  "/logos/coach.png": {
    "type": "image/png",
    "etag": "\"571fb-SRH5daMiW9yuilKSonDpouTk9dk\"",
    "mtime": "2026-07-18T01:51:01.390Z",
    "size": 356859,
    "path": "../public/logos/coach.png"
  },
  "/logos/html.png": {
    "type": "image/png",
    "etag": "\"2ea0f-aApjkrcD+Xmg/qGpg1B+AgMGFoY\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 190991,
    "path": "../public/logos/html.png"
  },
  "/logos/jboss.png": {
    "type": "image/png",
    "etag": "\"174b6-Z/ryEATPP/+eHMGoJzsJRGN6lz0\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 95414,
    "path": "../public/logos/jboss.png"
  },
  "/logos/jira.png": {
    "type": "image/png",
    "etag": "\"63fe-TnKY1i0AN0ouLOrioTLqPmcMyZU\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 25598,
    "path": "../public/logos/jira.png"
  },
  "/logos/kanban.png": {
    "type": "image/png",
    "etag": "\"56bb-gtDfvE5wHqzWIqBFpi2UZZJwhzY\"",
    "mtime": "2026-07-18T01:51:01.486Z",
    "size": 22203,
    "path": "../public/logos/kanban.png"
  },
  "/logos/linux.png": {
    "type": "image/png",
    "etag": "\"1da17-NCp5LkZPxF9X7azcauLTSI80ixk\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 121367,
    "path": "../public/logos/linux.png"
  },
  "/logos/mongodb.png": {
    "type": "image/png",
    "etag": "\"499d-cHzfMG7g+KTvX4F/AnYTW3nKdgo\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 18845,
    "path": "../public/logos/mongodb.png"
  },
  "/logos/mysql.png": {
    "type": "image/png",
    "etag": "\"73b2-Uje7ba9m53rQic2C1Kx43qnFyO4\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 29618,
    "path": "../public/logos/mysql.png"
  },
  "/images/20230725_155258_original.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f6d1d-Xvosnipy/1B6C9j/CxtM4jxlJcI\"",
    "mtime": "2026-07-18T01:51:01.362Z",
    "size": 4156701,
    "path": "../public/images/20230725_155258_original.jpg"
  },
  "/logos/negotiate.png": {
    "type": "image/png",
    "etag": "\"635e-riNLJgnK9mOEi3WCRPcZkKEhvu0\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 25438,
    "path": "../public/logos/negotiate.png"
  },
  "/logos/nodejs.png": {
    "type": "image/png",
    "etag": "\"68e1-xSvnJ2A0IFXYXL1pBBS8QMNxpQc\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 26849,
    "path": "../public/logos/nodejs.png"
  },
  "/logos/nuxtjs.svg": {
    "type": "image/svg+xml",
    "etag": "\"9e2-l+KeWBoX+EzfvPcRWsezBd8LBaE\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 2530,
    "path": "../public/logos/nuxtjs.svg"
  },
  "/logos/openapi.png": {
    "type": "image/png",
    "etag": "\"9016-lMF/+t+V4oQnwFPrgIpr4k8mh+0\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 36886,
    "path": "../public/logos/openapi.png"
  },
  "/logos/oracledb.png": {
    "type": "image/png",
    "etag": "\"c2e4-eyV3+EPbU4ARmGgTlnESQZZCesA\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 49892,
    "path": "../public/logos/oracledb.png"
  },
  "/logos/prebidjs.png": {
    "type": "image/png",
    "etag": "\"37af-ZXN5XoAE9ICWVfdeU0ZIzNJMiRs\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 14255,
    "path": "../public/logos/prebidjs.png"
  },
  "/logos/react.png": {
    "type": "image/png",
    "etag": "\"4702-+vSjbQZ2xQId8tFGdnHojZC4CSo\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 18178,
    "path": "../public/logos/react.png"
  },
  "/logos/rest-api.svg": {
    "type": "image/svg+xml",
    "etag": "\"13bf-lMQBGvANc0Ye7BaGn0x0nC0WcFM\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 5055,
    "path": "../public/logos/rest-api.svg"
  },
  "/logos/ruby.png": {
    "type": "image/png",
    "etag": "\"c133-UP5UsL6XJD9qMiSQvTqQBy32E3Y\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 49459,
    "path": "../public/logos/ruby.png"
  },
  "/logos/scrum.png": {
    "type": "image/png",
    "etag": "\"a582-t8WYzukIRIeQUY22bBvI7RQXOHo\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 42370,
    "path": "../public/logos/scrum.png"
  },
  "/logos/postgresdb.png": {
    "type": "image/png",
    "etag": "\"4b520-qjg31HW9LSdSvdOn/P7iOJ1HHQs\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 308512,
    "path": "../public/logos/postgresdb.png"
  },
  "/logos/product-map.png": {
    "type": "image/png",
    "etag": "\"1e604-hOI04xLQJQtBd7VKoxSoBP32gK8\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 124420,
    "path": "../public/logos/product-map.png"
  },
  "/logos/springboot.png": {
    "type": "image/png",
    "etag": "\"e152-q6OtlkcRywMVivimvdYEa3w1d0E\"",
    "mtime": "2026-07-18T01:51:01.490Z",
    "size": 57682,
    "path": "../public/logos/springboot.png"
  },
  "/logos/swagger.png": {
    "type": "image/png",
    "etag": "\"3c8d-JhA1uFyAAvMytnNIOAEBUR55gVc\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 15501,
    "path": "../public/logos/swagger.png"
  },
  "/logos/tailwindCSS.webp": {
    "type": "image/webp",
    "etag": "\"2af2-ajdH35pcTXcwl6ILv5HlzGh3ZeQ\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 10994,
    "path": "../public/logos/tailwindCSS.webp"
  },
  "/logos/sqlserver.png": {
    "type": "image/png",
    "etag": "\"14663-P/NWEWcLtpncV09DlOmlCsgW8Q0\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 83555,
    "path": "../public/logos/sqlserver.png"
  },
  "/logos/sass.png": {
    "type": "image/png",
    "etag": "\"2c6e6-H3/sPFIyKsIVGEHn189S20/Mtjw\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 181990,
    "path": "../public/logos/sass.png"
  },
  "/logos/typescript.png": {
    "type": "image/png",
    "etag": "\"3444-IelC00rS9iA/BO+zjaAZaDEPRuE\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 13380,
    "path": "../public/logos/typescript.png"
  },
  "/logos/tailwindcss.png": {
    "type": "image/png",
    "etag": "\"10187-7IXWDjWsdXABf5DZPBz9e/Hne8s\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 65927,
    "path": "../public/logos/tailwindcss.png"
  },
  "/logos/ultimus.webp": {
    "type": "image/webp",
    "etag": "\"2a16-kBtBFRsgh9FwOGp3AnwUze1Idq8\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 10774,
    "path": "../public/logos/ultimus.webp"
  },
  "/logos/vuejs.png": {
    "type": "image/png",
    "etag": "\"5f4c-e3NXJ2GHKd+zeJeWDu0cBVgOqXo\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 24396,
    "path": "../public/logos/vuejs.png"
  },
  "/logos/vuetify.svg": {
    "type": "image/svg+xml",
    "etag": "\"784-THq/ren/TgYIiGHQW4fbNM55SZc\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 1924,
    "path": "../public/logos/vuetify.svg"
  },
  "/_nuxt/-PLQgQ95.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"146-EAhaN15bfnRtsni8sHJJGlu6/gk\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 326,
    "path": "../public/_nuxt/-PLQgQ95.js"
  },
  "/logos/weblogic.png": {
    "type": "image/png",
    "etag": "\"15f09-ZrAx8DDJ68pmK4XXThxMN84ahsk\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 89865,
    "path": "../public/logos/weblogic.png"
  },
  "/_nuxt/-jXiw8J8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb24-Lx+Fb2MDGcWh0M2s3SztSvNsASY\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 60196,
    "path": "../public/_nuxt/-jXiw8J8.js"
  },
  "/_nuxt/1015-400x400.Xhbfzp9r.jpg": {
    "type": "image/jpeg",
    "etag": "\"6af5-9X2pPnIh6QHnBTDezKOEx2pbJhY\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 27381,
    "path": "../public/_nuxt/1015-400x400.Xhbfzp9r.jpg"
  },
  "/_nuxt/1016-400x400.DOkB5JDV.jpg": {
    "type": "image/jpeg",
    "etag": "\"789a-Rm9MWGkmnUOXzoA68MrGcQnAC0A\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 30874,
    "path": "../public/_nuxt/1016-400x400.DOkB5JDV.jpg"
  },
  "/_nuxt/1020-400x400.FnYbwooJ.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d4a-eQ3rV21piy8/44jymp2Fm+9qw0I\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 23882,
    "path": "../public/_nuxt/1020-400x400.FnYbwooJ.jpg"
  },
  "/_nuxt/1028-400x400.Dp5BkDx6.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f46-M+kzxdIO8wxdWVE4Sloetle10tY\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 16198,
    "path": "../public/_nuxt/1028-400x400.Dp5BkDx6.jpg"
  },
  "/_nuxt/1057-400x400.B34SQslb.jpg": {
    "type": "image/jpeg",
    "etag": "\"5677-Y4pMrx3XbdW3tQvUwIH/r9N0SbA\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 22135,
    "path": "../public/_nuxt/1057-400x400.B34SQslb.jpg"
  },
  "/_nuxt/1039-400x400.32DJT6K6.jpg": {
    "type": "image/jpeg",
    "etag": "\"770c-87Bv9bj7owFuWKwbZbo4tWHss9A\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 30476,
    "path": "../public/_nuxt/1039-400x400.32DJT6K6.jpg"
  },
  "/_nuxt/1047-400x400.saPlo0tf.jpg": {
    "type": "image/jpeg",
    "etag": "\"80cd-jB1gj+8kwmJ71m6gnxXtghwKqj0\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 32973,
    "path": "../public/_nuxt/1047-400x400.saPlo0tf.jpg"
  },
  "/_nuxt/106-400x400.tfQniRTw.jpg": {
    "type": "image/jpeg",
    "etag": "\"6887-yGdu0pGgQSpkkdsjRgRr4YZMimg\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 26759,
    "path": "../public/_nuxt/106-400x400.tfQniRTw.jpg"
  },
  "/_nuxt/110-400x400.C77eDXYR.jpg": {
    "type": "image/jpeg",
    "etag": "\"7317-A7dVbYUg9xO7KILeNu+WftMpPpU\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 29463,
    "path": "../public/_nuxt/110-400x400.C77eDXYR.jpg"
  },
  "/_nuxt/136-400x400.DtnCDixc.jpg": {
    "type": "image/jpeg",
    "etag": "\"6992-/O+/4r/Sk14Bzi+dFoQ84Nc34Uc\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 27026,
    "path": "../public/_nuxt/136-400x400.DtnCDixc.jpg"
  },
  "/_nuxt/2taj5khX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c1-cJwNXccoE3wymkkWgm7tQT1eAkE\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 6337,
    "path": "../public/_nuxt/2taj5khX.js"
  },
  "/_nuxt/15-400x400.BqQVTh-R.jpg": {
    "type": "image/jpeg",
    "etag": "\"9659-6FDNMJKAS+a/67zGSWAuy1jvA1Y\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 38489,
    "path": "../public/_nuxt/15-400x400.BqQVTh-R.jpg"
  },
  "/_nuxt/B0oSrkCJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ea-sTWSn9O6cMthDFvOBMtDukda3oA\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 2282,
    "path": "../public/_nuxt/B0oSrkCJ.js"
  },
  "/_nuxt/AdJbU6Do.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b681-o609Uo5L7+rGmxQPm0vLqGUBZVE\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 46721,
    "path": "../public/_nuxt/AdJbU6Do.js"
  },
  "/_nuxt/B1UqCew_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ac2-fv1GiK8IVmSYCF0c9+IssJQCI6Q\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 15042,
    "path": "../public/_nuxt/B1UqCew_.js"
  },
  "/_nuxt/B8_1F-aY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"148d1-eSpCEJAL8/LrtcANwXns/9LhRYU\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 84177,
    "path": "../public/_nuxt/B8_1F-aY.js"
  },
  "/_nuxt/B9-AqJQa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"91a8-vnPa+qirgsTpIiP4FIDs7bq8d6M\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 37288,
    "path": "../public/_nuxt/B9-AqJQa.js"
  },
  "/_nuxt/B9zSZHIH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eef-Iiok1lKcVKdq3T96Mt8gQwi/ycA\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 3823,
    "path": "../public/_nuxt/B9zSZHIH.js"
  },
  "/_nuxt/BCqWjfFD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54c7-6nmVUkTUbBxn9Wi0AMy1Mv4uCQI\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 21703,
    "path": "../public/_nuxt/BCqWjfFD.js"
  },
  "/_nuxt/BDDFrvEe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b6-QAZ2jeIiQMvEoGZI2HwdiZqF3w0\"",
    "mtime": "2026-07-18T01:51:01.310Z",
    "size": 694,
    "path": "../public/_nuxt/BDDFrvEe.js"
  },
  "/_nuxt/BLHKwCB-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e85-QAcN8bpR6hvxB0e51pZ5xZyMx08\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 24197,
    "path": "../public/_nuxt/BLHKwCB-.js"
  },
  "/_nuxt/BNg6M2Te.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21e4-3zJJJs1WpIZmBn2nXCg3+s/8lOU\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 8676,
    "path": "../public/_nuxt/BNg6M2Te.js"
  },
  "/_nuxt/BUKi9EwU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16f-q0gIzMlpeaQmfRBkmoCMzXgIVds\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 367,
    "path": "../public/_nuxt/BUKi9EwU.js"
  },
  "/_nuxt/BU2KwT1u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"788b-yLx8I6aDz+lx14btEi/eqfJ+ezM\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 30859,
    "path": "../public/_nuxt/BU2KwT1u.js"
  },
  "/_nuxt/BaqTgq05.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1274-qObJ/F7BKPGACW2HqOx6nq7OQmE\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 4724,
    "path": "../public/_nuxt/BaqTgq05.js"
  },
  "/_nuxt/Bb5MAZm_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d7e-cdZYsBnRk3idx3Wxj1ulDfTdT28\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 3454,
    "path": "../public/_nuxt/Bb5MAZm_.js"
  },
  "/_nuxt/ByDV-aAu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e90-cJ4AvhEMkQg+8k1C9dgyweoGJUw\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 11920,
    "path": "../public/_nuxt/ByDV-aAu.js"
  },
  "/_nuxt/BzqqaBM2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6061-k6A86GL2TUiua31L3HwNE4105V8\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 24673,
    "path": "../public/_nuxt/BzqqaBM2.js"
  },
  "/_nuxt/C1ohtNt3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1de-DW8bcd4X7MUcdN7BWKbHEHTIc8M\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 478,
    "path": "../public/_nuxt/C1ohtNt3.js"
  },
  "/_nuxt/C3YJfAyO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"56-s4cLpIDQYJSNYG0b/l7bSzraPR4\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 86,
    "path": "../public/_nuxt/C3YJfAyO.js"
  },
  "/_nuxt/C4oFFobl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"66-AJMQ4SHyqm5gIqnholP+GWT8uNw\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 102,
    "path": "../public/_nuxt/C4oFFobl.js"
  },
  "/_nuxt/C8Bvg6Fz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"688-mW0Db9XeMpn9qsYcavbV6AKy1kk\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 1672,
    "path": "../public/_nuxt/C8Bvg6Fz.js"
  },
  "/_nuxt/C5L4Pr5J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"589e-/dM52W4iG/FnfCiETMo+NmpxX7U\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 22686,
    "path": "../public/_nuxt/C5L4Pr5J.js"
  },
  "/_nuxt/CCju15FN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12ec-sxicLpkYSYlsaj9aTqme+PXQYn4\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 4844,
    "path": "../public/_nuxt/CCju15FN.js"
  },
  "/_nuxt/CFLwXfRB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27a8-TMBjNs6d4/kf/44+FJGLUgwuQ7o\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 10152,
    "path": "../public/_nuxt/CFLwXfRB.js"
  },
  "/_nuxt/CMXpdbjM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"131a-5tNJFEJ6ssS+Elz/FRQUQa9QLFk\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 4890,
    "path": "../public/_nuxt/CMXpdbjM.js"
  },
  "/_nuxt/CEwCzN2O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb1f-moAF0/lenLIgFMobUNDwfYDU2PA\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 60191,
    "path": "../public/_nuxt/CEwCzN2O.js"
  },
  "/_nuxt/CW0LXHrN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2721-yJwV+RFVG/kG0RGifx2kyO+OV+s\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 10017,
    "path": "../public/_nuxt/CW0LXHrN.js"
  },
  "/_nuxt/CROEeeEl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9158-znalsmXUqQCExXkohvxeZodx+K8\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 37208,
    "path": "../public/_nuxt/CROEeeEl.js"
  },
  "/_nuxt/CerpFSJ7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"93d7-KjpD/zefYDH7jP/G8YMGMsG9oOw\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 37847,
    "path": "../public/_nuxt/CerpFSJ7.js"
  },
  "/_nuxt/CjuusA0M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27a4-GVBPanlbQu1zj2+rtENRsOMoIG8\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 10148,
    "path": "../public/_nuxt/CjuusA0M.js"
  },
  "/_nuxt/Cn9sHGYd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18e-/nLUoIWKCnbX2bYz+E1ScCHBwS0\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 398,
    "path": "../public/_nuxt/Cn9sHGYd.js"
  },
  "/_nuxt/CndJ1uqb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7329-SQqFZDrH3gl9VcNCJrknX0ty1GY\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 29481,
    "path": "../public/_nuxt/CndJ1uqb.js"
  },
  "/_nuxt/CXXp0Ybv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74e04-bRSZRjRb0oYQsWce4NkvwV3KCrU\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 478724,
    "path": "../public/_nuxt/CXXp0Ybv.js"
  },
  "/_nuxt/Cua_tMRI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"85bf-0YKJioK0arIr8RAJnn7S0yJrwP4\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 34239,
    "path": "../public/_nuxt/Cua_tMRI.js"
  },
  "/_nuxt/Cup6QpeV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10b7c-f+Qp8qCqVwJRfDwBEqDPo1+8In4\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 68476,
    "path": "../public/_nuxt/Cup6QpeV.js"
  },
  "/_nuxt/CutsdmQO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"535-m/dshFLI6w+uS8pEFdqshO4Y1WQ\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 1333,
    "path": "../public/_nuxt/CutsdmQO.js"
  },
  "/_nuxt/Cyu9clx1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc-wE/O7m8gSIsAulF8exNj7eUigM8\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 188,
    "path": "../public/_nuxt/Cyu9clx1.js"
  },
  "/_nuxt/D3Qa351f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e91-y3FgMLL6uOsRql0yr+1lptGPH6o\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 7825,
    "path": "../public/_nuxt/D3Qa351f.js"
  },
  "/_nuxt/D3qo6DvI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1621-dQWeh1wiTTMIXqAQ33liVrMykqw\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 5665,
    "path": "../public/_nuxt/D3qo6DvI.js"
  },
  "/_nuxt/DA0SZYl8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b8-F0kWCtQVMPtNFiBRCK0pIS2WeEY\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 696,
    "path": "../public/_nuxt/DA0SZYl8.js"
  },
  "/_nuxt/D6EkA9Iu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b082-GTagJWqGEMOyBKx+qeyK4HJLXj4\"",
    "mtime": "2026-07-18T01:51:01.314Z",
    "size": 110722,
    "path": "../public/_nuxt/D6EkA9Iu.js"
  },
  "/_nuxt/DH3WMO_w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b7-PoFAMEzwn5ylJ/H7nF1p95R4pTg\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 1463,
    "path": "../public/_nuxt/DH3WMO_w.js"
  },
  "/_nuxt/DHuO7-vr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"93-xRdYufbd50GhBn47YyR9xphrTmQ\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 147,
    "path": "../public/_nuxt/DHuO7-vr.js"
  },
  "/_nuxt/DMiKYFSt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243e-Kf7+HQVkOcBzrYObddC0V4wMgq0\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 9278,
    "path": "../public/_nuxt/DMiKYFSt.js"
  },
  "/_nuxt/DNHHcrY4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a0-7dpaSwC8BLYxJ4yAS0XaQILEXdE\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 928,
    "path": "../public/_nuxt/DNHHcrY4.js"
  },
  "/_nuxt/DXCxdEoC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5415-2o38eJoa+DYQHTHqJUHzEPd7OfM\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 21525,
    "path": "../public/_nuxt/DXCxdEoC.js"
  },
  "/_nuxt/DXwe1W7z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d7c-g/7/x0CWvEykmPEDxOYc7YbUPbE\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 3452,
    "path": "../public/_nuxt/DXwe1W7z.js"
  },
  "/_nuxt/DIJV9JVE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40378-+b+AEu74BMNbJW+aGVCDuD2pa3w\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 263032,
    "path": "../public/_nuxt/DIJV9JVE.js"
  },
  "/_nuxt/Dkx6sApZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db1-UXzt/St7q89wVaGPqV3O4eDngdI\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 3505,
    "path": "../public/_nuxt/Dkx6sApZ.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DoUNaLx4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"979c-iLZkgG+SEc6dpLyi9xOUtDYWZ3w\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 38812,
    "path": "../public/_nuxt/DoUNaLx4.js"
  },
  "/_nuxt/EM0UkkjL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6723-dgerN9TxFxonTabYqFx+mjkBfVA\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 26403,
    "path": "../public/_nuxt/EM0UkkjL.js"
  },
  "/_nuxt/I2Jhpfv3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"529e-VIw6MCxstT3uxNT7r9k688fqA/g\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 21150,
    "path": "../public/_nuxt/I2Jhpfv3.js"
  },
  "/_nuxt/TPS62zx_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a0-WExPd/e5J62zJMJ8mQvhq+p7y48\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 1184,
    "path": "../public/_nuxt/TPS62zx_.js"
  },
  "/_nuxt/DokuH998.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bf0e-DCkGwHAWINh3hh2VqMLlIDd2djo\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 179982,
    "path": "../public/_nuxt/DokuH998.js"
  },
  "/_nuxt/background-1.7KPBTySk.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d678-6tAiy+on/9QTS9FXJBxN6GpGh50\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 185976,
    "path": "../public/_nuxt/background-1.7KPBTySk.jpg"
  },
  "/_nuxt/color-tools.CjuWh_vT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2a-s+pn+bBrwiiUuAHPEHXRCh9W28k\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 3626,
    "path": "../public/_nuxt/color-tools.CjuWh_vT.css"
  },
  "/_nuxt/entry.Bd_gO-5g.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19101-KBTXhXqMG5xWbwom6d2tYAeM6S0\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 102657,
    "path": "../public/_nuxt/entry.Bd_gO-5g.css"
  },
  "/_nuxt/error-404.D8t3QiuX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"97e-X5bvzu4nnMA9oxwcb+4p26F+geY\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 2430,
    "path": "../public/_nuxt/error-404.D8t3QiuX.css"
  },
  "/_nuxt/DLMcZJZL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1620be-J8ee8mPgwEnmHggLTzU5hghtZuU\"",
    "mtime": "2026-07-18T01:51:01.318Z",
    "size": 1450174,
    "path": "../public/_nuxt/DLMcZJZL.js"
  },
  "/_nuxt/error-500.CTSlSiFU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"773-y844h5s3PTQJhuzQrz8cKrr+7aQ\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.CTSlSiFU.css"
  },
  "/_nuxt/error.D60QVBfX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24-8CEb5BOR3giCrP8kG26zZ+g1k6w\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 36,
    "path": "../public/_nuxt/error.D60QVBfX.css"
  },
  "/_nuxt/fQA4vaDy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b56-BQQ6uVJvEL1zg37S4xQWov2sSOM\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 6998,
    "path": "../public/_nuxt/fQA4vaDy.js"
  },
  "/_nuxt/geist-cyrillic-ext-wght-normal.DjL33-gN.woff2": {
    "type": "font/woff2",
    "etag": "\"1cfc-yYSDXNlt/tTRaj6rJo8ZMqvY7pQ\"",
    "mtime": "2026-07-18T01:51:01.322Z",
    "size": 7420,
    "path": "../public/_nuxt/geist-cyrillic-ext-wght-normal.DjL33-gN.woff2"
  },
  "/_nuxt/geist-cyrillic-wght-normal.BEAKL7Jp.woff2": {
    "type": "font/woff2",
    "etag": "\"3aec-5kpQSZEtAzzU5kdiuro3Zr2YR54\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 15084,
    "path": "../public/_nuxt/geist-cyrillic-wght-normal.BEAKL7Jp.woff2"
  },
  "/_nuxt/geist-latin-ext-wght-normal.DC-KSUi6.woff2": {
    "type": "font/woff2",
    "etag": "\"4080-mZu3Z7sOWqglha+kefNbUA9Pp+Q\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 16512,
    "path": "../public/_nuxt/geist-latin-ext-wght-normal.DC-KSUi6.woff2"
  },
  "/_nuxt/geist-latin-wght-normal.BgDaEnEv.woff2": {
    "type": "font/woff2",
    "etag": "\"72d8-9J+D7/6th5UzRxIgoFX9awJv47A\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 29400,
    "path": "../public/_nuxt/geist-latin-wght-normal.BgDaEnEv.woff2"
  },
  "/_nuxt/geist-vietnamese-wght-normal.6IgcOCM7.woff2": {
    "type": "font/woff2",
    "etag": "\"1f44-6MZ7/PEEOeDVF0eHI650KpwKQV8\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 8004,
    "path": "../public/_nuxt/geist-vietnamese-wght-normal.6IgcOCM7.woff2"
  },
  "/_nuxt/hanken-grotesk-latin-400-normal.BG6hkEXj.woff2": {
    "type": "font/woff2",
    "etag": "\"3494-tTybHbKY3M3ZPifNRtn5VD+rSeI\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 13460,
    "path": "../public/_nuxt/hanken-grotesk-latin-400-normal.BG6hkEXj.woff2"
  },
  "/_nuxt/hanken-grotesk-latin-400-normal.CjyVwvJV.woff": {
    "type": "font/woff",
    "etag": "\"4358-M6YZj97rqt4WZDKkROj0Np3W4Jc\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 17240,
    "path": "../public/_nuxt/hanken-grotesk-latin-400-normal.CjyVwvJV.woff"
  },
  "/_nuxt/hanken-grotesk-latin-600-normal.CIXX6EOa.woff2": {
    "type": "font/woff2",
    "etag": "\"35d4-oWzZmo3R/A1ckLqPMtbGghaJtYA\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 13780,
    "path": "../public/_nuxt/hanken-grotesk-latin-600-normal.CIXX6EOa.woff2"
  },
  "/_nuxt/hanken-grotesk-latin-600-normal.NEn2C4Q3.woff": {
    "type": "font/woff",
    "etag": "\"4464-Uv+OkmFjYpCD0NNfV8MmiB5sq5o\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 17508,
    "path": "../public/_nuxt/hanken-grotesk-latin-600-normal.NEn2C4Q3.woff"
  },
  "/_nuxt/hanken-grotesk-latin-ext-400-normal.DI-aIsWt.woff": {
    "type": "font/woff",
    "etag": "\"3108-weh7Z0Uh419kKgM7QM63naefQkM\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 12552,
    "path": "../public/_nuxt/hanken-grotesk-latin-ext-400-normal.DI-aIsWt.woff"
  },
  "/_nuxt/hanken-grotesk-latin-ext-400-normal.DR7lHpW4.woff2": {
    "type": "font/woff2",
    "etag": "\"2358-rV43ch6gSN+Nq0gIfQT0fNkZehk\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 9048,
    "path": "../public/_nuxt/hanken-grotesk-latin-ext-400-normal.DR7lHpW4.woff2"
  },
  "/_nuxt/hanken-grotesk-latin-ext-600-normal.DHIm05DD.woff": {
    "type": "font/woff",
    "etag": "\"30d8-CMffxMlNkuvDX3yu3RLSwf/4HLY\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 12504,
    "path": "../public/_nuxt/hanken-grotesk-latin-ext-600-normal.DHIm05DD.woff"
  },
  "/_nuxt/hanken-grotesk-latin-ext-600-normal.FY8kSObK.woff2": {
    "type": "font/woff2",
    "etag": "\"240c-s4h5dtskqWhnPhyMgs1QGqjk3B4\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 9228,
    "path": "../public/_nuxt/hanken-grotesk-latin-ext-600-normal.FY8kSObK.woff2"
  },
  "/_nuxt/hanken-grotesk-vietnamese-400-normal.BLrFBAHj.woff2": {
    "type": "font/woff2",
    "etag": "\"1228-Gu6Rha48XHGcR1zEVSmI+iMYjzg\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 4648,
    "path": "../public/_nuxt/hanken-grotesk-vietnamese-400-normal.BLrFBAHj.woff2"
  },
  "/_nuxt/hanken-grotesk-vietnamese-400-normal.C-iWyKLC.woff": {
    "type": "font/woff",
    "etag": "\"1968-SaDphzLYqWF5QaoRuLn3MY5oMlA\"",
    "mtime": "2026-07-18T01:51:01.326Z",
    "size": 6504,
    "path": "../public/_nuxt/hanken-grotesk-vietnamese-400-normal.C-iWyKLC.woff"
  },
  "/_nuxt/hanken-grotesk-vietnamese-600-normal.Cp8QQjQf.woff2": {
    "type": "font/woff2",
    "etag": "\"1280-wEngsbz/W3uXLYUwtefh4Bo/FEY\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 4736,
    "path": "../public/_nuxt/hanken-grotesk-vietnamese-600-normal.Cp8QQjQf.woff2"
  },
  "/_nuxt/hanken-grotesk-vietnamese-600-normal.DHaFH8q1.woff": {
    "type": "font/woff",
    "etag": "\"196c-M9blSeGISTOkDfs4xzahDXHZtgU\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 6508,
    "path": "../public/_nuxt/hanken-grotesk-vietnamese-600-normal.DHaFH8q1.woff"
  },
  "/_nuxt/index.DTmr2tDz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"660-sSypusmJ8sTX4fwy3JP6zGzdiKY\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 1632,
    "path": "../public/_nuxt/index.DTmr2tDz.css"
  },
  "/_nuxt/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2": {
    "type": "font/woff2",
    "etag": "\"14d0-wP6+M+HGdr9/ksFVSvTe+I0Y0rI\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 5328,
    "path": "../public/_nuxt/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2"
  },
  "/_nuxt/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff": {
    "type": "font/woff",
    "etag": "\"1b40-oGh4jaPe06qJnXZqmnfGfJQP4Ag\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 6976,
    "path": "../public/_nuxt/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff"
  },
  "/_nuxt/jetbrains-mono-cyrillic-600-normal.8K4wrrwR.woff": {
    "type": "font/woff",
    "etag": "\"1b6c-eUSp5UiT2t+kK7lr5klXWWJpgDg\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 7020,
    "path": "../public/_nuxt/jetbrains-mono-cyrillic-600-normal.8K4wrrwR.woff"
  },
  "/_nuxt/jetbrains-mono-cyrillic-600-normal.EVf6-Yzo.woff2": {
    "type": "font/woff2",
    "etag": "\"1508-iJzQGYxKlCYEGNzOPN1RWvcvpH0\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 5384,
    "path": "../public/_nuxt/jetbrains-mono-cyrillic-600-normal.EVf6-Yzo.woff2"
  },
  "/_nuxt/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff": {
    "type": "font/woff",
    "etag": "\"1620-uF5DPKyxthnzZIfm2hBQUEmcCDI\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 5664,
    "path": "../public/_nuxt/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff"
  },
  "/_nuxt/jetbrains-mono-greek-400-normal.C190GLew.woff2": {
    "type": "font/woff2",
    "etag": "\"1084-bKcqPuNhRWWCQbsWLqSOoRkxv70\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 4228,
    "path": "../public/_nuxt/jetbrains-mono-greek-400-normal.C190GLew.woff2"
  },
  "/_nuxt/jetbrains-mono-greek-600-normal.H7WoG9Et.woff2": {
    "type": "font/woff2",
    "etag": "\"10d4-x+y6KRsvgllZZ1XdDEKdyeScLUI\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 4308,
    "path": "../public/_nuxt/jetbrains-mono-greek-600-normal.H7WoG9Et.woff2"
  },
  "/_nuxt/jetbrains-mono-greek-600-normal.mc2nkWzM.woff": {
    "type": "font/woff",
    "etag": "\"1644-emX6Z+3DAtv56K8g/BV0Lp0g/p0\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 5700,
    "path": "../public/_nuxt/jetbrains-mono-greek-600-normal.mc2nkWzM.woff"
  },
  "/_nuxt/jetbrains-mono-latin-400-normal.6-qcROiO.woff": {
    "type": "font/woff",
    "etag": "\"6b68-PjVYVbMXaGEDnHrQQmycVNcGrEA\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 27496,
    "path": "../public/_nuxt/jetbrains-mono-latin-400-normal.6-qcROiO.woff"
  },
  "/_nuxt/jetbrains-mono-latin-400-normal.V6pRDFza.woff2": {
    "type": "font/woff2",
    "etag": "\"52b0-OuYhUYIQ5ljyzsko4MOu3m0M7+I\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 21168,
    "path": "../public/_nuxt/jetbrains-mono-latin-400-normal.V6pRDFza.woff2"
  },
  "/_nuxt/jetbrains-mono-latin-600-normal.BfsvjouI.woff": {
    "type": "font/woff",
    "etag": "\"6e14-d04vnAsxfPgntDfBEOHDNWaOJgg\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 28180,
    "path": "../public/_nuxt/jetbrains-mono-latin-600-normal.BfsvjouI.woff"
  },
  "/_nuxt/jetbrains-mono-latin-600-normal.C8RAYTDA.woff2": {
    "type": "font/woff2",
    "etag": "\"5564-CBo3fWrr/gd1JNhcvMmg9aC8X00\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 21860,
    "path": "../public/_nuxt/jetbrains-mono-latin-600-normal.C8RAYTDA.woff2"
  },
  "/_nuxt/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2": {
    "type": "font/woff2",
    "etag": "\"1ca8-sBWBn421OuV4ZHOZxHJjafE1huU\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 7336,
    "path": "../public/_nuxt/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2"
  },
  "/_nuxt/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff": {
    "type": "font/woff",
    "etag": "\"2790-MZORDuKd3VMoaYVXmW8yROWL9sY\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 10128,
    "path": "../public/_nuxt/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff"
  },
  "/_nuxt/jetbrains-mono-latin-ext-600-normal.BfB_LPfz.woff2": {
    "type": "font/woff2",
    "etag": "\"1d58-DHWtD4tnw9ESLDSrJ9HfV574VqY\"",
    "mtime": "2026-07-18T01:51:01.330Z",
    "size": 7512,
    "path": "../public/_nuxt/jetbrains-mono-latin-ext-600-normal.BfB_LPfz.woff2"
  },
  "/_nuxt/jetbrains-mono-latin-ext-600-normal.DObL3zCW.woff": {
    "type": "font/woff",
    "etag": "\"284c-D5+FYxhL9VJ3gXCvogEDy0Tn+ik\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 10316,
    "path": "../public/_nuxt/jetbrains-mono-latin-ext-600-normal.DObL3zCW.woff"
  },
  "/_nuxt/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff": {
    "type": "font/woff",
    "etag": "\"14fc-wa8Pi/SxAFg9ve8x5GbO/sMJWEo\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 5372,
    "path": "../public/_nuxt/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff"
  },
  "/_nuxt/jetbrains-mono-vietnamese-600-normal.OWROknRo.woff": {
    "type": "font/woff",
    "etag": "\"1564-l7sCcOed/ObBFkAm2p4HwdBODN4\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 5476,
    "path": "../public/_nuxt/jetbrains-mono-vietnamese-600-normal.OWROknRo.woff"
  },
  "/_nuxt/o7wFE2--.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"106-y2ay/uzCRDDvuwo2+N7B9+FBtzk\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 262,
    "path": "../public/_nuxt/o7wFE2--.js"
  },
  "/_nuxt/ogmiQTWH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"56-n8KQscegyrLhnGW0/pQvUmyoq7s\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 86,
    "path": "../public/_nuxt/ogmiQTWH.js"
  },
  "/_nuxt/products.Dl4-8F_N.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62a-buGG04vc2fJ01ob8pbeLJHGoGK0\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 1578,
    "path": "../public/_nuxt/products.Dl4-8F_N.css"
  },
  "/_nuxt/mJMxNgxo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"536e8-pBXmvdIY9y494CxralmqpG0dRVs\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 341736,
    "path": "../public/_nuxt/mJMxNgxo.js"
  },
  "/_nuxt/qQI07767.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4443-SA3N5HimwCNx9AFP+wykKhg9coI\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 17475,
    "path": "../public/_nuxt/qQI07767.js"
  },
  "/_nuxt/sCgDY9ex.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e9-3jWr/GWsoSVtgBp26HBC2wRIHCc\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 745,
    "path": "../public/_nuxt/sCgDY9ex.js"
  },
  "/_nuxt/sNfuOFWG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"707e-HCSEuMvb72KlyMcoUuI5cU6LIxQ\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 28798,
    "path": "../public/_nuxt/sNfuOFWG.js"
  },
  "/certificates/pdfs/cert-ai-fluency-framework.pdf": {
    "type": "application/pdf",
    "etag": "\"24a29-WMu5f6j+KATgjhaDlsRsUmcKl1I\"",
    "mtime": "2026-07-18T01:51:01.346Z",
    "size": 150057,
    "path": "../public/certificates/pdfs/cert-ai-fluency-framework.pdf"
  },
  "/certificates/pdfs/cert-claude-with-api.pdf": {
    "type": "application/pdf",
    "etag": "\"1a691-EhMlV7hRnaqNgLuI7nJiM4ZAg10\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 108177,
    "path": "../public/certificates/pdfs/cert-claude-with-api.pdf"
  },
  "/certificates/pdfs/cert-introduction-mcp-anthopic.pdf": {
    "type": "application/pdf",
    "etag": "\"1c5da-vnyP+ws2bE+9+6py+PXtyaKt+yI\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 116186,
    "path": "../public/certificates/pdfs/cert-introduction-mcp-anthopic.pdf"
  },
  "/certificates/pdfs/cert-generative-ai-with-llms.pdf": {
    "type": "application/pdf",
    "etag": "\"7477a-u3eT5qFz098Pfl3qBaOwdXgPnEo\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 477050,
    "path": "../public/certificates/pdfs/cert-generative-ai-with-llms.pdf"
  },
  "/certificates/pdfs/cert-introduction-to-mcp.pdf": {
    "type": "application/pdf",
    "etag": "\"1c5da-vnyP+ws2bE+9+6py+PXtyaKt+yI\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 116186,
    "path": "../public/certificates/pdfs/cert-introduction-to-mcp.pdf"
  },
  "/certificates/pdfs/cert-introduction-to-subagents.pdf": {
    "type": "application/pdf",
    "etag": "\"1967a-G5ys0YlhfHubWE1A28qmyUnmnGs\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 104058,
    "path": "../public/certificates/pdfs/cert-introduction-to-subagents.pdf"
  },
  "/_nuxt/juan-image.CDKdi2wW.png": {
    "type": "image/png",
    "etag": "\"163ef5-Et+nldSCqMRZa6j8/wNeFy+k1SA\"",
    "mtime": "2026-07-18T01:51:01.334Z",
    "size": 1457909,
    "path": "../public/_nuxt/juan-image.CDKdi2wW.png"
  },
  "/certificates/pdfs/cert-langraph-essencials.pdf": {
    "type": "application/pdf",
    "etag": "\"31d1d-ke+abkluREaVzUIvN73GDMNuKuM\"",
    "mtime": "2026-07-18T01:51:01.494Z",
    "size": 204061,
    "path": "../public/certificates/pdfs/cert-langraph-essencials.pdf"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-nYuxRrFM5gzKGifQLSU8/YNE0tI\"",
    "mtime": "2026-07-18T01:51:01.294Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/d7f78b5e-90cb-40fc-ab30-f9fcc62047ea.json": {
    "type": "application/json",
    "etag": "\"58-QTfoN+zss3IYzeUBZKnyDtpSq3U\"",
    "mtime": "2026-07-18T01:51:01.290Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/d7f78b5e-90cb-40fc-ab30-f9fcc62047ea.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _MohrLi = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash$1(parseURL$1(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader$1(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL$1(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader$1(event, "Cache-Control");
      throw createError$2({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader$1(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader$1(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader$1(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader$1(event, "Content-Type")) {
    setResponseHeader$1(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader$1(event, "ETag")) {
    setResponseHeader$1(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader$1(event, "Last-Modified")) {
    setResponseHeader$1(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader$1(event, "Content-Encoding")) {
    setResponseHeader$1(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader$1(event, "Content-Length")) {
    setResponseHeader$1(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const defaultThrowErrorValue = { throwError: true };
const defaultSecurityConfig = (serverlUrl, strict) => {
  const defaultConfig = {
    strict,
    headers: {
      crossOriginResourcePolicy: "same-origin",
      crossOriginOpenerPolicy: "same-origin",
      crossOriginEmbedderPolicy: "credentialless",
      contentSecurityPolicy: {
        "base-uri": ["'none'"],
        "font-src": ["'self'", "https:", "data:"],
        "form-action": ["'self'"],
        "frame-ancestors": ["'self'"],
        "img-src": ["'self'", "data:"],
        "object-src": ["'none'"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": ["'self'", "https:", "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        "upgrade-insecure-requests": true
      },
      originAgentCluster: "?1",
      referrerPolicy: "no-referrer",
      strictTransportSecurity: {
        maxAge: 15552e3,
        includeSubdomains: true
      },
      xContentTypeOptions: "nosniff",
      xDNSPrefetchControl: "off",
      xDownloadOptions: "noopen",
      xFrameOptions: "SAMEORIGIN",
      xPermittedCrossDomainPolicies: "none",
      xXSSProtection: "0",
      permissionsPolicy: {
        camera: [],
        "display-capture": [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2e6,
      maxUploadFileRequestInBytes: 8e6,
      ...defaultThrowErrorValue
    },
    rateLimiter: {
      // Twitter search rate limiting
      tokensPerInterval: 150,
      interval: 3e5,
      headers: false,
      driver: {
        name: "lruCache"
      },
      whiteList: void 0,
      ipHeader: void 0,
      ...defaultThrowErrorValue
    },
    xssValidator: {
      methods: ["GET", "POST"],
      ...defaultThrowErrorValue
    },
    corsHandler: {
      // Options by CORS middleware for Express https://github.com/expressjs/cors#configuration-options
      origin: serverlUrl,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      preflight: {
        statusCode: 204
      }
    },
    allowedMethodsRestricter: {
      methods: "*",
      ...defaultThrowErrorValue
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    removeLoggers: true,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true
    },
    sri: true
  };
  {
    defaultConfig.headers.crossOriginEmbedderPolicy = "require-corp";
    defaultConfig.headers.contentSecurityPolicy = {
      "base-uri": ["'none'"],
      "default-src": ["'none'"],
      "connect-src": ["'self'"],
      "font-src": ["'self'"],
      "form-action": ["'self'"],
      "frame-ancestors": ["'self'"],
      "frame-src": ["'self'"],
      "img-src": ["'self'"],
      "manifest-src": ["'self'"],
      "media-src": ["'self'"],
      "object-src": ["'none'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "'nonce-{{nonce}}'"],
      "script-src": ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
      "upgrade-insecure-requests": true,
      "worker-src": ["'self'"]
    };
    defaultConfig.ssg.hashStyles = true;
    defaultConfig.headers.strictTransportSecurity = {
      maxAge: 31536e3,
      includeSubdomains: true,
      preload: true
    }, defaultConfig.headers.xFrameOptions = "DENY";
    defaultConfig.headers.permissionsPolicy = {
      accelerometer: [],
      /* Disable OWASP Experimental values
      'ambient-light-sensor':[],
      */
      autoplay: [],
      /* Disable OWASP Experimental values
      battery:[],
      */
      camera: [],
      "display-capture": [],
      /* Disable OWASP Experimental values
      'document-domain':[],
      */
      "encrypted-media": [],
      fullscreen: [],
      /* Disable OWASP Experimental values
      gamepad:[],
      */
      geolocation: [],
      gyroscope: [],
      /* Disable OWASP Experimental values
      'layout-animations':['self'],
      */
      /* Disable OWASP Experimental values
      'legacy-image-formats':['self'],
      */
      magnetometer: [],
      microphone: [],
      midi: [],
      /* Disable OWASP Experimental values
      'oversized-images':['self'],
      */
      payment: [],
      "picture-in-picture": [],
      "publickey-credentials-get": [],
      "screen-wake-lock": [],
      /* Disable OWASP Experimental values
      'speaker-selection':[],
      */
      "sync-xhr": ["self"],
      /* Disable OWASP Experimental values
      'unoptimized-images':['self'],
      */
      /* Disable OWASP Experimental values
      'unsized-media':['self'],
      */
      usb: [],
      "web-share": [],
      "xr-spatial-tracking": []
    };
  }
  return defaultConfig;
};

const FILE_UPLOAD_HEADER = "multipart/form-data";
const defaultSizeLimiter = defaultSecurityConfig("", true).requestSizeLimiter;
const _s3WrPB = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.requestSizeLimiter) {
    const requestSizeLimiter = defu(
      rules.requestSizeLimiter,
      defaultSizeLimiter
    );
    if (["POST", "PUT", "DELETE"].includes(event.node.req.method)) {
      const contentLengthValue = getRequestHeader(event, "content-length");
      const contentTypeValue = getRequestHeader(event, "content-type");
      const isFileUpload = contentTypeValue?.includes(FILE_UPLOAD_HEADER);
      const requestLimit = isFileUpload ? requestSizeLimiter.maxUploadFileRequestInBytes : requestSizeLimiter.maxRequestSizeInBytes;
      if (parseInt(contentLengthValue) >= requestLimit) {
        const payloadTooLargeError = {
          statusCode: 413,
          statusMessage: "Payload Too Large"
        };
        if (requestSizeLimiter.throwError === false) {
          return payloadTooLargeError;
        }
        throw createError(payloadTooLargeError);
      }
    }
  }
});

const _FA8Kpv = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.corsHandler) {
    const { corsHandler } = rules;
    let origin;
    if (typeof corsHandler.origin === "string" && corsHandler.origin !== "*") {
      origin = [corsHandler.origin];
    } else {
      origin = corsHandler.origin;
    }
    if (origin && origin !== "*" && corsHandler.useRegExp) {
      origin = origin.map((o) => new RegExp(o, "i"));
    }
    handleCors(event, {
      origin,
      methods: corsHandler.methods,
      allowHeaders: corsHandler.allowHeaders,
      exposeHeaders: corsHandler.exposeHeaders,
      credentials: corsHandler.credentials,
      maxAge: corsHandler.maxAge,
      preflight: corsHandler.preflight
    });
  }
});

const _ju8SDM = defineEventHandler((event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.allowedMethodsRestricter) {
    const { allowedMethodsRestricter } = rules;
    const allowedMethods = allowedMethodsRestricter.methods;
    if (allowedMethods !== "*" && !allowedMethods.includes(event.node.req.method)) {
      const methodNotAllowedError = {
        statusCode: 405,
        statusMessage: "Method not allowed"
      };
      if (allowedMethodsRestricter.throwError === false) {
        return methodNotAllowedError;
      }
      throw createError(methodNotAllowedError);
    }
  }
});

const storage = useStorage("#rate-limiter-storage");
const defaultRateLimiter = defaultSecurityConfig("", true).rateLimiter;
const _TdJUFG = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  const route = resolveSecurityRoute(event);
  if (rules.enabled && rules.rateLimiter) {
    const rateLimiter = defu(
      rules.rateLimiter,
      defaultRateLimiter
    );
    const ip = getIP(event, rateLimiter.ipHeader);
    if (rateLimiter.whiteList && rateLimiter.whiteList.includes(ip)) {
      return;
    }
    const url = ip + route;
    let storageItem = await storage.getItem(url);
    if (!storageItem) {
      await setStorageItem(rateLimiter, url);
    } else {
      if (typeof storageItem !== "object") {
        return;
      }
      const timeSinceFirstRateLimit = storageItem.date;
      const timeForInterval = storageItem.date + Number(rateLimiter.interval);
      if (Date.now() >= timeForInterval) {
        await setStorageItem(rateLimiter, url);
        storageItem = await storage.getItem(url);
      }
      const isLimited = timeSinceFirstRateLimit <= timeForInterval && storageItem.value === 0;
      if (isLimited) {
        const tooManyRequestsError = {
          statusCode: 429,
          statusMessage: "Too Many Requests"
        };
        if (rules.rateLimiter.headers) {
          setResponseHeader(event, "x-ratelimit-remaining", 0);
          setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
          setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
        }
        if (rateLimiter.throwError === false) {
          return tooManyRequestsError;
        }
        throw createError(tooManyRequestsError);
      }
      const newItemDate = timeSinceFirstRateLimit > timeForInterval ? Date.now() : storageItem.date;
      const newStorageItem = { value: storageItem.value - 1, date: newItemDate };
      await storage.setItem(url, newStorageItem);
      const currentItem = await storage.getItem(url);
      if (currentItem && rateLimiter.headers) {
        setResponseHeader(event, "x-ratelimit-remaining", currentItem.value);
        setResponseHeader(event, "x-ratelimit-limit", rateLimiter.tokensPerInterval);
        setResponseHeader(event, "x-ratelimit-reset", timeForInterval);
      }
    }
  }
});
async function setStorageItem(rateLimiter, url) {
  const rateLimitedObject = { value: rateLimiter.tokensPerInterval, date: Date.now() };
  await storage.setItem(url, rateLimitedObject);
}
function getIP(event, customIpHeader) {
  const ip = customIpHeader ? getRequestHeader(event, customIpHeader) || "" : getRequestIP(event, { xForwardedFor: true }) || "";
  return ip;
}

const _RGR_Jv = defineEventHandler(async (event) => {
  const rules = resolveSecurityRules(event);
  if (rules.enabled && rules.xssValidator) {
    const filterOpt = {
      ...rules.xssValidator,
      escapeHtml: void 0
    };
    if (rules.xssValidator.escapeHtml === false) {
      filterOpt.escapeHtml = (value) => value;
    }
    const xssValidator = new FilterXSS(filterOpt);
    if (event.node.req.socket.readyState !== "readOnly") {
      if (rules.xssValidator.methods && rules.xssValidator.methods.includes(
        event.node.req.method
      )) {
        const valueToFilter = event.node.req.method === "GET" ? getQuery(event) : event.node.req.headers["content-type"]?.includes(
          "multipart/form-data"
        ) ? await readMultipartFormData(event) : await readBody(event);
        if (valueToFilter && Object.keys(valueToFilter).length) {
          if (valueToFilter.statusMessage && valueToFilter.statusMessage !== "Bad Request") {
            return;
          }
          const stringifiedValue = JSON.stringify(valueToFilter);
          const processedValue = xssValidator.process(
            JSON.stringify(valueToFilter)
          );
          if (processedValue !== stringifiedValue) {
            const badRequestError = {
              statusCode: 400,
              statusMessage: "Bad Request"
            };
            if (rules.xssValidator.throwError === false) {
              return badRequestError;
            }
            throw createError(badRequestError);
          }
        }
      }
    }
  }
});

const _SxA8c9 = defineEventHandler$1(() => {});

const _lazy_ilPvEs = () => import('../routes/api/v1/analytics/_id_.get.mjs');
const _lazy_RDUpIQ = () => import('../routes/api/v1/analytics/analytics-repository.mjs');
const _lazy_FjWpgv = () => import('../routes/api/v1/index.get.mjs');
const _lazy_yhx26N = () => import('../routes/api/v1/index.post.mjs');
const _lazy_G7V3xJ = () => import('../routes/api/v1/index2.get.mjs');
const _lazy_04ueaI = () => import('../routes/api/v1/index2.post.mjs');
const _lazy_TgM52l = () => import('../routes/api/v1/messages/message-repository.mjs');
const _lazy_sdO90U = () => import('../routes/api/v1/index3.get.mjs');
const _lazy_GxwVv6 = () => import('../routes/api/v1/index3.post.mjs');
const _lazy_Fu0fd0 = () => import('../routes/api/v1/notifications/message-repository.mjs');
const _lazy_YUnsNB = () => import('../routes/api/v1/test/_id_.get.mjs');
const _lazy_Sl6BuF = () => import('../routes/api/v1/index4.get.mjs');
const _lazy_nZD428 = () => import('../routes/api/v1/index4.post.mjs');
const _lazy__M8FV5 = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _MohrLi, lazy: false, middleware: true, method: undefined },
  { route: '/api/v1/analytics/:id', handler: _lazy_ilPvEs, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/analytics/analytics-repository', handler: _lazy_RDUpIQ, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/analytics', handler: _lazy_FjWpgv, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/analytics', handler: _lazy_yhx26N, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/messages', handler: _lazy_G7V3xJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/messages', handler: _lazy_04ueaI, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/messages/message-repository', handler: _lazy_TgM52l, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/notifications', handler: _lazy_sdO90U, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/notifications', handler: _lazy_GxwVv6, lazy: true, middleware: false, method: "post" },
  { route: '/api/v1/notifications/message-repository', handler: _lazy_Fu0fd0, lazy: true, middleware: false, method: undefined },
  { route: '/api/v1/test/:id', handler: _lazy_YUnsNB, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/test', handler: _lazy_Sl6BuF, lazy: true, middleware: false, method: "get" },
  { route: '/api/v1/test', handler: _lazy_nZD428, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy__M8FV5, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _s3WrPB, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _FA8Kpv, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _ju8SDM, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _TdJUFG, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _RGR_Jv, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy__M8FV5, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr$1(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader$1(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders$1(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr$1(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { parseQuery$1 as A, withTrailingSlash$1 as B, withoutTrailingSlash$1 as C, nodeServer as D, defineRenderHandler as a, destr$1 as b, createError$2 as c, destr as d, encodePath as e, getRouteRules as f, getQuery$2 as g, getResponseStatusText as h, getResponseStatus as i, joinRelativeURL as j, useNitroApp as k, i as l, l as m, decodePath as n, hasProtocol$1 as o, parseURL$1 as p, isScriptProtocol as q, joinURL$1 as r, s$1 as s, sanitizeStatusCode$1 as t, useRuntimeConfig as u, getContext as v, withQuery$1 as w, defu$2 as x, defu$1 as y, executeAsync as z };
//# sourceMappingURL=nitro.mjs.map
