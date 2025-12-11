// node run-process.cjs ./api/note/processes/export-notes-to-md-file.js

import env from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config({ path: `${__dirname}/.env` })
if (process.argv.length < 3) {
  console.log('usage: run-process.js <processfile.js>')
  console.log('  ex: node run-process.js ./api/note/processes/migrate-articles-to-notes.js')
  process.exit(1)
}
console.log(process.argv[2])
import(process.argv[2]).then( ({ runProcess }) => {
  runProcess()
})


