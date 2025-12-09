// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
import Identity from '../../lib/monads/identity'
import List from '../../lib/monads/list'
import Maybe from '../../lib/monads/maybe'

describe('Create an identity monad', () => {
  it(' returns 1 the same value when emitted', () => {
    const one = Identity.of(1)
    expect(one.emit()).toBe(1)
  })

  it('return 2 when chained with a + 1', () => {
    const one = Identity.of(1)
    expect(one.chain((x) => x + 1)).toBe(2)
  })

  it('return 2 identity when mapped to a + 1', () => {
    const one = Identity.of(1)
    expect(one.map((x) => x + 1).inspect()).toBe('Identity(2)')
  })

  it('return [1,3,4,7,10] concated with 12 ', () => {
    const myNumbers = List.of([1, 3, 4, 7, 10])

    expect(myNumbers.concat([12]).inspect()).toBe('List(1,3,4,7,10,12)')
  })

  it('return 1 as the head of [1,3,4,7,10]', () => {
    const myNumbers = List.of([1, 3, 4, 7, 10])

    expect(myNumbers.head()).toBe(1)
  })

  it(' maybe do or maybe does not ', () => {
    const reading1 = 15
    const reading2 = null

    const fahrenheitToCelsius = (a) => (a - 32) * 0.5556

    const tempC1 = Maybe.of(reading1).map(fahrenheitToCelsius)
    expect(tempC1.inspect()).toBe('Just(-9.4452)')

    const tempC2 = Maybe.of(reading2).map(fahrenheitToCelsius)
    expect(tempC2.inspect()).toBe('Nothing')
  })
})
