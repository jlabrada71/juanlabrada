import { d as defineEventHandler, p as parseCookies, g as getQuery } from '../../../../_/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import '../../../../_/index2.mjs';
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

const _id__get = defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const cookies = parseCookies(event);
  const query = getQuery(event);
  return { a: query.a, b: query.b, config, cookies, context: event.context };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
