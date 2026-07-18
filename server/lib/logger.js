import { formatDate } from './formatters/date-formatters.js'

function stackTrace (error = new Error()) {

  const stack = error.stack || ''
  const stackLines = stack.split('\n').slice(1)
  const trace = stackLines.map(line => line.trim().replace(/^at\s+/,''))
  return trace
}

function callerInfo (depth = 2) { 
  const trace = stackTrace()
  if (trace.length >= depth) {
    const line = trace[depth - 1]
    const match = line.match(/^(.*?)( \((.*):(\d+):(\d+)\))?$/)
    if (match) {
      const functionName = match[1]
      const filePath = match[3] || '<anonymous>'
      const lineNumber = match[4] || '0'
      const columnNumber = match[5] || '0'
      return { functionName, filePath, lineNumber, columnNumber }
    }
  }
  return { functionName: '<unknown>', filePath: '<unknown>', lineNumber: '0', columnNumber: '0' }
}

function log (message, context = 'main', type = 'LOG', callerDepth = 4) {
  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 2)
  }
  const caller = callerInfo(callerDepth)
  context = `${context} @ ${caller.filePath}:${caller.lineNumber}`
  const text = formatDate(new Date(Date.now())) + ': ' + message
  console.log(`\x1B[46m\x1B[37m${type}:${context}\x1B[40m\x1B[37m ${text}\x1B[0m`)
}

function debug (message, context) {
  if (process.env.NODE_ENV !== 'production') {
    log(message, context, 'DEBUG', 5)
  }
}

export { log, debug }
