import { d as defineEventHandler, p as parseCookies, g as getQuery } from '../../../_/index.mjs';
import { u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import '../../../_/index2.mjs';
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

const index_get = defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const cookies = parseCookies(event);
  const query = getQuery(event);
  return { a: query.a, b: query.b, config, cookies };
});

export { index_get as default };
//# sourceMappingURL=index4.get.mjs.map
