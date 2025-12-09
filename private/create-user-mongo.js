require('dotenv').config({ path: `${__dirname}/.env` })
const { MongoClient } = require('mongodb')

async function createUser (username, password, role, userDatabase) {
  const database = process.env.MONGO_DB
  const collection = 'system.users'
  const connection = process.env.MONGO_URL
  console.log(`${connection}  ---> ${database}:${collection}`)

  let client
  try {
    client = await MongoClient.connect(connection /* process.env.MONGO_URL */, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    const obj = {
      createUser: username,
      pwd: password, // Or  "<cleartext password>"
      // customData: { <any information> },
      roles: [
        { role: role, db: userDatabase }
      ]
      // writeConcern: { <write concern> },
      //  authenticationRestrictions: [
      //    { clientSource: [ "<IP|CIDR range>", ... ], serverAddress: [ "<IP|CIDR range>", ... ] },

      //  ],
      //  mechanisms: [ "<scram-mechanism>", ... ],  //Available starting in MongoDB 4.0
      // digestPassword: <boolean>,
      // comment: <any>
    }

    const db = client.db(database)

    db.runCommand(obj)

    client.createUser(obj)
  } catch (e) {
    console.log(e.stack)
    return
  }
  client.close()
}
/*
db.createUser( { user: "juanlabrada",
                 pwd: passwordPrompt(),
                 roles: [ { role: "readWrite", db: "juanlabrada" }] },
               { w: "majority" , wtimeout: 5000 } )
 */

createUser('juanlabrada', 'Cobian98', 'readWrite', 'juanlabrada-dev')
