export default class Booking {
  constructor (id, attendee, bookingState) {
    this.id = id
    this.attendee = attendee
    this.state = bookingState
  }

  static createNew (attendeeName) {
    const booking = new Booking(
      Id.newId(),
      attendeeName,
      new PendingState()
    )
    return booking
  }

  transitionToState (state) {
    /* implement what happens when enters the state */
    this.state = state
    this.state.enterState(this)
  }

  cancel (reason) {
    this.state.cancel(this, reason)
  }

  accept (booking) {
    this.state.accept(this)
  }
}
