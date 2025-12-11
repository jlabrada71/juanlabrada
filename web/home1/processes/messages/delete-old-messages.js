// How to execute:
// node run-process.js ./processes/messages/delete-old-messages.js <timestamp>
import { MongoClient } from 'mongodb'
import { log, debug } from '../../lib/logger.js'

const database = process.env.MONGO_DB
const collection = 'messages'
const connection = process.env.MONGO_URL
debug(`database:${database}`)
debug(`connection${connection}`)

async function deleteRecords (query, message = '') {
  return new Promise(async (resolve, reject) => {
    let client = null
    let error = null
    try {
      client = await MongoClient.connect(connection /* process.env.MONGO_URL */, {
      })
  
      const dbo = client.db(database)
      const col = dbo.collection(collection)
     
      const result = await col.deleteMany(query)
      debug('Deleted ' + result.deletedCount + ' documents ' + message)
    } catch (e) {
      log(JSON.stringify(e.stack, null, 2), 'messages-repository')
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
      { filter: { email: '' }, note: 'by email'},
      { filter: { ip: '3.15.9.164' }, note: 'by ip'},
      { filter: { ua: 'axios/1.3.5' }, note: 'by ua' },
      { filter: { ts: { $lte: date } } , note: 'by date'},
    ]

    if (date) {
      queries.push()
    }

    Promise.all( queries.map(query => deleteRecords(query.filter, query.note) )).then(() => console.log('All deleted'))
  } catch (e) {
    log(JSON.stringify(e.stack, null, 2), 'messages-repository')
  }
}

function runProcess () {
  log(process.argv[3])
  const oneYearBackFromNow = new Date()
  oneYearBackFromNow.setFullYear(oneYearBackFromNow.getFullYear() - 1)
  const d = Date.parse(process.argv[3]) || oneYearBackFromNow.getTime()
  const deleteDate = new Date(d)
  console.log('Deleting older than ' + deleteDate.toString())
  deleteOld( deleteDate.getTime()).then(() => {
    log('Old deleted')
  })
}

export { runProcess }
