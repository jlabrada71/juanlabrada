import Article from '@/article/lib/article'
// import HelloWorld from '@/components/HelloWorld.vue';

describe('Rating Management', () => {
  it('has 0 rating initially', () => {
    const article = new Article({})
    expect(article.rating).toBe(0)
  })
  it('has 0 rating count initially', () => {
    const article = new Article({})
    expect(article.ratingCount).toBe(0)
  })
  it('gets 5 rating when a 5 rating is added', () => {
    const article = new Article({})
    article.addRating(5)
    expect(article.rating).toBe(5)
  })
  it('gets 1 rating count when a 5 rating is added', () => {
    const article = new Article({})
    article.addRating(5)
    expect(article.ratingCount).toBe(1)
  })
  it('gets 4 rating when a 5 rating and a 3 rating are added', () => {
    const article = new Article({})
    article.addRating(5)
    article.addRating(3)
    expect(article.rating).toBe(4)
  })
  it('gets 2 rating count when a 5 rating and a 3 rating are added', () => {
    const article = new Article({})
    article.addRating(5)
    article.addRating(3)
    expect(article.ratingCount).toBe(2)
  })
})
