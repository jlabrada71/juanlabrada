export default class Logger {
  static log (message, feature) {
    if (feature) {
      console.log(`${feature}: ${message}`)
    } else {
      console.log(message)
    }
  }

  static debug (message, feature) {
    if (process.env.NODE_ENV !== 'development') {
      return
    }
    Logger.log(message, feature)
  }
}
