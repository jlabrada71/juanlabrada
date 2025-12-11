// How to execute:
// node run-process.js ./processes/analytics/delete-old-analytics.js <timestamp>
import { MongoClient } from 'mongodb'
import { log, debug } from '../../lib/logger.js'

const database = process.env.MONGO_DB
const collection = 'analytics'
const connection = process.env.MONGO_URL
console.log('**************************************')
debug(`database:${database}`)
debug(`connection${connection}`)
console.log('**************************************')

async function deleteRecords (query, message = '') {
  return new Promise(async (resolve, reject) => {
    let client = null
    let error = null
    try {
      client = await MongoClient.connect(connection /* process.env.MONGO_URL */, {      })
  
      const dbo = client.db(database)
      const col = dbo.collection(collection)
     
      const result = await col.deleteMany(query)
      debug('Deleted ' + result.deletedCount + ' documents ' + message)
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), 'analytics-repository')
      error = e
    } finally {
      client.close()
    }
    if (error) reject(e); 
    else resolve()
  })
}

async function deleteOld (date) {
  try {
    const queries = [
      { filter: { userId: 'f9b57676-4cf1-47fc-95bc-c31e73b1623f' }, note: 'by userId'},
      { filter: { referrer: /http\:\/\/localhost.*/ }, note: 'by localhost'},
      { filter: { ua: /.*Vue-Telescope.*/ }, note: 'by user agent'},
      // { filter: { ts: null } , note: 'by ts null'},
      { filter: { ts: { $lte: date } } , note: 'by date'},
      { filter: { ip: '2804:7f5:f380:a047:b497:56d:6818:e5e4' }, note: 'by ip'},
      { filter: { ip: /.*2804:14d:bac1:42df.*/  } , note: 'by ip'},
      { filter: { ip: '2804:14d:bac1:42df:3e7f:b120:4436:239c' } , note: 'by ip'},
      { filter: { ip: '2804:14d:bac1:42df:a271:f223:6c32:24cf' } , note: 'by ip'},
      { filter: { countryCode: null } , note: 'by countryCode null'},
      { filter: { ua: /.*Applebot.*/ } , note: 'by apple bot'},
      { filter: { ua: /.*bingbot.*/ } , note: 'by Bing bot'},
      { filter: { ua: /.*YandexRenderResourcesBot.*/ } , note: 'by yandex bot'},
      { filter: { ua: /.*YandexBot.*/ } , note: 'by yandex bot'},
      { filter: { ua: /.*HeadlessChrome.*/ } , note: 'by HeadlessChrome'},
      { filter: { ua: /.*AhrefsBot.*/ } , note: 'by AhrefsBot'},
    ]

    Promise.all( queries.map(query => deleteRecords(query.filter, query.note) )).then(() => console.log('All deleted'))
    //   queries.forEach(async (query) => {
    //   await deleteRecords(query.filter, query.note)
    // } )
    
    
    // await deleteRecords(query1, 'from localhost')
    // await deleteRecords(query2, 'by ua')
    // await deleteRecords(query2_1, 'by ua')
    // await deleteRecords(query2_2, 'by ua')
    // await deleteRecords(query2_3, 'by ua')
    // await deleteRecords(query3, 'by ip')
    // await deleteRecords(query4, 'by date')
    // await deleteRecords(query5, 'by ip')
    // await deleteRecords(query6, 'by IP')
  } catch (e) {
    log(JSON.stringify(e.stack, null, 2), 'analytics-repository')
  }
}

function runProcess () {
  log(process.argv[3])
  const oneYearBackFromNow = new Date()
  oneYearBackFromNow.setMonth(oneYearBackFromNow.getMonth() - 12)
  const d = process.argv[3] || oneYearBackFromNow.getTime()
  console.log('Deleting older than ' + new Date(d).toString())
  deleteOld(Number(d)).then(() => {
    log('Old deleted')
  })
}

export { runProcess }
