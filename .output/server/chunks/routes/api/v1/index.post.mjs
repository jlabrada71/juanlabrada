import { d as defineEventHandler, r as readBody, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import AnalyticsRepository from './analytics/analytics-repository.mjs';
import { l as log } from '../../../_/logger.mjs';
import axios from 'axios';
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

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const req = event.node.req;
  return store(req, body);
});
async function store(req, body) {
  const connection = req.socket || req.connection;
  const ip = req.headers["x-forwarded-for"] || connection.remoteAddress;
  const headers = {};
  let i = 0;
  while (i < req.rawHeaders.length) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i + 1];
    i += 2;
  }
  const ua = headers["user-agent"];
  const referrer = headers.referer;
  const data = { ...JSON.parse(body), ip, ua, referrer };
  const ips = ip.split(",").map((newIp) => newIp.trim());
  const searchIp = ips.length > 0 ? ips[ips.length - 1] : "";
  if (searchIp) {
    try {
      const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qIH2HfQsTznud6lwzlBOk26edIi2y&ipAddress=${searchIp}`);
      const geoData = response.data;
      data.countryCode = geoData.country_code;
    } catch (e) {
      log(e.stack, "analytics-routes");
      data.countryCode = "Unknown";
    }
  } else {
    data.countryCode = "Unknown";
  }
  const config = useRuntimeConfig();
  const analyticsRepository = new AnalyticsRepository(config.MONGO_URL, config.MONGO_DB);
  try {
    const result = await analyticsRepository.insert(data);
    return result;
  } catch (e) {
    log(e.stack, "analytics-routes");
    return { error: e.msg };
  }
}

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
