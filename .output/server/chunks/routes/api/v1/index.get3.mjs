import { d as defineEventHandler, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import MessageRepository from './notifications/message-repository.mjs';
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
import 'mongodb';
import '../../../_/logger.mjs';

const index_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const messageRepository = new MessageRepository(config.MONGO_URL, config.MONGO_DB);
  const result = await messageRepository.select({});
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
