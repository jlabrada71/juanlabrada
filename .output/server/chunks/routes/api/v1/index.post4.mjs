import { d as defineEventHandler, r as readBody } from '../../../nitro/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { body };
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
