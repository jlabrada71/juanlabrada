export default class NoteBase {
  constructor (json) {
    const data = json || {}
    this._id = data._id
    this.id = data.id
    this.title = data.title
    this.seoDescription = data.seoDescription || ''
    this.description = data.description
    this.text = data.text
    this.rating = Number(data.rating || 0)
    this.ratingCount = Number(data.ratingCount || 0)
    this.categories = data.categories
    this.safeUrl = data.safeUrl
    this.image = data.image
  }

  toJSON () {
    return {
      _id: this._id,
      id: this.id,
      title: this.title,
      seoDescription: this.seoDescription,
      description: this.description,
      text: this.text,
      rating: this.rating,
      ratingCount: this.ratingCount,
      categories: this.categories,
      safeUrl: this.safeUrl,
      image: this.image
    }
  }
}
