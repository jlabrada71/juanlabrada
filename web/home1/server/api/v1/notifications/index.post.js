// curl -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"  -X POST 'localhost:3000/api/test' 
//  for file: -d @data.txt
// curl -H "Content-Type: application/json" -d '{"title": "generation", "email":"jlabrada@yahoo.com", "content":"Download Link"}' -X POST 'localhost:3000/api/v1/notifications'
//  for file: -d @data.json

import MessageRepository from "./message-repository"
import { log } from '../../../lib/logger'
import Mailer from '../../../lib/mails/mailer'

const debug = log

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const req = event.node.req
    // debug(Object.keys(req))   
    debug(body)
    return store(req, body)
})

function sendMessage (config, message) {
  const text = JSON.stringify(message.content, null, 2)
  debug(text)
  const envelop = {
    from: 'agile@juanlabrada.com',
    to: message.email,
    subject: message.title,
    //  replyTo: nodeMailerUser,
    //  html: applicationSubmit({name: name, brand: brand, accountId: accountId, paymentEmail: paymentEmail, date: date, currency: currency, type: typeOfAccount})
    // text: message.content
    html: message.content
  }

  const account = {
    user: config.MAILER_ACCOUNT,
    pass: config.MAILER_PASS
  }
  // debug('***** MAILER ACCOUNT ******')
  // debug(account)

  const hostConfig = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true
  }

  const mailer = new Mailer(hostConfig, account)
  return mailer.send(envelop)
}

async function store(req, body) {
  const connection = req.socket || req.connection
  const ip = req.headers['x-forwarded-for'] || connection.remoteAddress

  const headers = {}
  let i = 0;
  while( i < req.rawHeaders.length) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i+1]
    i += 2
  }

  const ua = headers['user-agent']
  const referrer = headers.referer
  const data = { body }
  data.ip = ip
  data.ua = ua
  data.referrer = referrer

  const config = useRuntimeConfig()
  const messageRepository = new MessageRepository(config.MONGO_URL, config.MONGO_DB)

  try {

    const result = await sendMessage(config, data.body)
    data.result = result
    const storeResult = await messageRepository.insert(data)

    return storeResult;
  } catch (e) {
    log(e.stack, 'message-routes')
    return { error: e.msg }
  }
}

