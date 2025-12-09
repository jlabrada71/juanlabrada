class Main {
  constructor () {
    this.isPending = true
    this.price = 5
    this.isExpired = false
    this.isCancelled = false
    this.Limis = { MAX: 1000 }
    this.isValid = true
  }

  accept () {
    if (!this.isPending) {
      if (this.price > this.Limits.MAX) { /* do something */
        this.isValid = false
      } else { /* do something else */ }
    } else if (this.isExpired) {
      throw new Error('Is expired')
    } else if (this.isCancelled) {
      if (this.isExpired && this.price > 1000) { /* do something */
        this.isPending = true
      } else if (!this.isExpired) {
        /* churn */
      } else {
        /* do whatever as default */

      }
    }
  }
}
