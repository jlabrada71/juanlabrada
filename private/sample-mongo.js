require('dotenv').config({ path: `${__dirname}/.env` })
const { MongoClient } = require('mongodb')

async function createArticle () {
  database = process.env.MONGO_DB
  collection = 'articles'
  connection = process.env.MONGO_URL
  console.log(`${connection}  ---> ${database}:${collection}`)

  let client
  try {
    client = await MongoClient.connect(connection /* process.env.MONGO_URL */, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    const dbo = client.db(database)
    const col = dbo.collection(collection)
    const obj = {
      title: 'test',
      text: 'text'
    }
    await col.insertOne(obj)
  } catch (e) {
    console.log(e.stack)
    return
  }
  client.close()
}

createArticle()
