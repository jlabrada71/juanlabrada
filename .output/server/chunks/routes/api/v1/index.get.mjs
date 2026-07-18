import { d as defineEventHandler } from '../../../_/index.mjs';
import { u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import AnalyticsRepository from './analytics/analytics-repository.mjs';
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
import 'mongodb';
import '../../../_/logger.mjs';

const index_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const analyticsRepository = new AnalyticsRepository(config.MONGO_URL, config.MONGO_DB);
  const result = await analyticsRepository.select({});
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
