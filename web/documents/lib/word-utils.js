
export default class PhrasesList {
  constructor () {
  }

  getPhrasesList (text) {
    const words = this.sentenceToWordList(text)
    const phrases = []
    for (let i = 0; i < words.length; i++) {
      for (let j = i; j < words.length; j++) {
        const phrase = words.slice(i, j + 1).join(' ')
        phrases.push(this.phraseListToPhraseCount(this.sentenceToWordList(phrase)))
      }
    }
    return phrases
  }

  isPhraseAtPosition (text, phrase, position) {
    let j = 0
    while ((j < phrase.length) && phrase[j] === text[j + position]) {
      j++
    }
    return j === phrase.length
  }

  getNextWordPosition (text, word, position) {
    while (position < text.length && text[position] !== word) {
      position++
    }
    return position
  }

  countPhraseInText (phrase, text) {
    if (phrase.length > text.length) {
      return 0
    }
    let i = 0
    let count = 0
    while (i < text.length) {
      i = this.getNextWordPosition(text, phrase[0], i)
      if ((i === text.length) || (i + phrase.length > text.length)) {
        return count
      }

      if (this.isPhraseAtPosition(text, phrase, i)) {
        count++
      }
      i++
    }
    return count
  }

  phraseListToPhraseCount (phraseList) {
    return { phrase: phraseList, count: 0 }
  }

  sentenceToWordList (sentence) {
    return sentence.split(' ').filter(word => word.length > 0)
  }

  getPhraseCount (text, phraseCountList) {
    const words = this.sentenceToWordList(text)
    const results = []
    for (const phraseCount of phraseCountList) {
      const count = this.countPhraseInText(phraseCount.phrase, words)
      phraseCount.count += count
      results.push(phraseCount)
    }
    return results
  }
}
