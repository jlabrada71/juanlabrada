import NoteBase from './note-base'

export default class Note extends NoteBase {
  addRating (newRating) {
    let ratingTotal = this.rating * this.ratingCount
    ratingTotal += newRating
    this.ratingCount += 1
    this.rating = ratingTotal / this.ratingCount
  }
}
