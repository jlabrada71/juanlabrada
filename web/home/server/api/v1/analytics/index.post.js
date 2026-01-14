// curl -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"  -X POST 'localhost:3000/api/v1/test' 
//  for file: -d @data.txt
// curl -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' -X POST 'localhost:3000/api/v1/analytics' 
//  for file: -d @data.json

import AnalyticsRepository from "./analytics-repository"
import { log, debug } from '../../../lib/logger'
import axios from 'axios'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const req = event.node.req
    // debug(Object.keys(req))   
    return store(req, body)
})

async function store(req, body) {
  const connection = req.socket || req.connection
  const ip = req.headers['x-forwarded-for'] || connection.remoteAddress
  // debug('adding', 'analytics-routes')
  // debug(req.url)
  // debug(req.originalUrl)
  const headers = {}
  let i = 0;
  while( i < req.rawHeaders.length) {
    headers[req.rawHeaders[i].toLowerCase()] = req.rawHeaders[i+1]
    i += 2
  }
  // debug(headers)
  // debug(body)
  // debug(ip)
  const ua = headers['user-agent']
  // debug(ua)
  const referrer = headers.referer
  // debug(referrer)
  // debug('****************************')

  const data = {...JSON.parse(body), ip, ua, referrer }
  const ips = ip.split(',').map(newIp => newIp.trim())
  const searchIp = ips.length > 0 ? ips[ips.length - 1] : ''
  if (searchIp) {
    try {
      const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_qIH2HfQsTznud6lwzlBOk26edIi2y&ipAddress=${searchIp}`)
      const geoData = response.data
      data.countryCode = geoData.country_code
    }
    catch (e) {
      log(e.stack, 'analytics-routes')
      data.countryCode = 'Unknown'
    }
  } else {
    data.countryCode = 'Unknown'
  }

  const config = useRuntimeConfig()
  const analyticsRepository = new AnalyticsRepository(config.MONGO_URL, config.MONGO_DB)

  try {
    const result = await analyticsRepository.insert(data)
    return result;
  } catch (e) {
    log(e.stack, 'analytics-routes')
    return { error: e.msg }
  }
}

