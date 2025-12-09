class Main {
  accept() {
    if (!isPending) {
      if (price > Limits.MAX) { /* do something */ } else { /* do something else */ }
    } else if (isExpired) {
      throw new Error('Is expired');
    } else if (isCancelled) {
      if (isExpired && price > 1000) { /* do something */ } else if (!isExpired) {
        /* churn */
      } else {
        /* do whatever as default */

      }
    }
  }
}
