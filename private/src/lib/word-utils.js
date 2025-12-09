
export default class PhrasesList {
  constructor () {
  }

  getPhrasesList (text) {
    const words = text.split(' ')
    const phrases = []
    for (let i = 0; i < words.length; i++) {
      for (let j = i; j < words.length; j++) {
        const phrase = words.slice(i, j + 1).join(' ')
        phrases.push(phrase)
      }
    }
    return phrases
  }
}
