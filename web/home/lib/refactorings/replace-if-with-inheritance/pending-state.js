import BookingState from './booking-state.js';

export default class PendingState extends BookingState {
  enterState(booking) {
    /* implement what happens when enters the state */
  }

  cancel(booking, reason) {
    /* implement what happens when is cancelled */
    booking.transitionToState(new CancelledState());
  }

  accept(booking) {
    /* implement what happens when is accepted */
    booking.transitionToState(new ProcessedState());
  }
}
