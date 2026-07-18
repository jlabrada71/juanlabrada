import BookingState from './booking-state.js';

export default class CancelledState extends BookingState {
  enterState(booking) {
    /* implement what happens when enters the state */
  }

  cancel(booking, reason) {
    /* implement what happens when is cancelled */
    console.log(`Booking ${booking.id} is already cancelled`);
  }

  accept(booking) {
    /* implement what happens when is accepted */
    console.log('Cannot accept a cancelled booking.');
  }
}
