// curl -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"  -X POST 'localhost:3000/api/test' 
//  for file: -d @data.txt
// curl -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' -X POST 'localhost:3000/api/v1/messages'
//  for file: -d @data.json

import MessageRepository from "./message-repository";
import { log, debug } from '../../../lib/logger';
import Mailer from '../../../lib/mails/mailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const req = event.node.req;
    debug(Object.keys(req));
    debug(body);
    return store(req, body);
});

function sendMessage (config, messageText) {
  const text = JSON.stringify(messageText, null, 2);
  debug(text);
  const message = {
    from: 'agile@juanlabrada.com',
    to: 'jlabrada@yahoo.com',
    subject: 'New Contact',
    //  replyTo: nodeMailerUser,
    //  html: applicationSubmit({name: name, brand: brand, accountId: accountId, paymentEmail: paymentEmail, date: date, currency: currency, type: typeOfAccount})
    text
  };

  const account = {
    user: config.MAILER_ACCOUNT,
    pass: config.MAILER_PASS
  };
  debug('***** MAILER ACCOUNT ******');
  debug(account);

  const hostConfig = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true
  };

  const mailer = new Mailer(hostConfig, account);
  return mailer.send(message);
}

async function store(req, body) {
  const connection = req.socket || req.connection
  const ip = req.headers['x-forwarded-for'] || connection.remoteAddress
  debug('adding', 'message-routes');
  debug(req.url);
  debug(req.originalUrl);
  const headers = {}
  let i = 0;
  while( i < req.rawHeaders.length) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i+1]
    i += 2
  }
  debug(headers);
  debug(body);
  debug(ip);
  const ua = headers['user-agent']
  debug(ua);
  const referrer = headers.referer
  debug(referrer);
  debug('****************************');

  const data = body
  data.ip = ip
  data.ua = ua
  data.referrer = referrer

  const config = useRuntimeConfig();
  const messageRepository = new MessageRepository(config.MONGO_URL, config.MONGO_DB);

  try {

    debug('adding', 'message-routes');
    debug(body.message);

    const result = await sendMessage(config, body.message);
    body.message.result = result
    const storeResult = await messageRepository.insert(body.message);

    return storeResult;
  } catch (e) {
    log(e.stack, 'message-routes');
    return { error: e.msg }
  }
}

