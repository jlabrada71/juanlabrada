import { formatDate } from './formatters/date-formatters.js'

function log (message, context = 'main', type = 'LOG') {
  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 2)
  }
  const text = formatDate(new Date(Date.now())) + ': ' + message
  console.log(`\x1B[46m\x1B[37m${type}:${context}\x1B[40m\x1B[37m ${text}\x1B[0m`)
}

function debug (message, context) {
  if (process.env.NODE_ENV !== 'production') {
    log(message, context)
  }
}

export { log, debug }
