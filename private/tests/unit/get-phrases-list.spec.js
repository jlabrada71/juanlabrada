import PhrasesList from '@/lib/word-utils'

describe('Generate all combinations of a sentence words', () => {
  const phrases = ['',
    'juan',
    'juan ramon',
    'juan ramon labrada']
  const expectations = [
    [''],
    ['juan'],
    ['juan', 'ramon', 'juan ramon'],
    ['juan', 'ramon', 'labrada', 'juan ramon', 'ramon labrada', 'juan ramon labrada']
  ]

  it(' phrases[i] returns expectations[i]', () => {
    const phrasesList = new PhrasesList()
    for (let i = 0; i < phrases.length; i++) {
      const result = phrasesList.getPhrasesList(phrases[i])
      expect(result.length).toBe(expectations[i].length)
      for (let j = 0; j < expectations[i].length; j++) {
        expect(result).toContain(expectations[i][j])
      }
    }
  })
})
