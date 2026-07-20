import { d as defineEventHandler, r as readBody, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import MessageRepository from './messages/message-repository.mjs';
import { d as debug, l as log } from '../../../_/logger.mjs';
import { M as Mailer } from '../../../_/mailer.mjs';
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
import 'nodemailer';

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const req = event.node.req;
  return store(req, body);
});
function sendMessage(config, messageText) {
  const text = JSON.stringify(messageText, null, 2);
  const message = {
    from: "agile@juanlabrada.com",
    to: "jlabrada@yahoo.com",
    subject: "New Contact",
    //  replyTo: nodeMailerUser,
    //  html: applicationSubmit({name: name, brand: brand, accountId: accountId, paymentEmail: paymentEmail, date: date, currency: currency, type: typeOfAccount})
    text
  };
  const account = {
    user: config.MAILER_ACCOUNT,
    pass: config.MAILER_PASS
  };
  const hostConfig = {
    host: "smtp.zoho.com",
    port: 465,
    secure: true
  };
  const mailer = new Mailer(hostConfig, account);
  return mailer.send(message);
}
async function store(req, body) {
  const connection = req.socket || req.connection;
  const ip = req.headers["x-forwarded-for"] || connection.remoteAddress;
  debug(req.url);
  debug(req.originalUrl);
  const headers = {};
  let i = 0;
  while (i < req.rawHeaders.length) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i + 1];
    i += 2;
  }
  const ua = headers["user-agent"];
  const referrer = headers.referer;
  const data = body;
  data.ip = ip;
  data.ua = ua;
  data.referrer = referrer;
  const config = useRuntimeConfig();
  const messageRepository = new MessageRepository(config.MONGO_URL, config.MONGO_DB);
  try {
    debug("adding", "message-routes");
    debug(body.message);
    const result = await sendMessage(config, body.message);
    body.message.result = result;
    const storeResult = await messageRepository.insert(body.message);
    return storeResult;
  } catch (e) {
    log(e.stack, "message-routes");
    return { error: e.msg };
  }
}

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
