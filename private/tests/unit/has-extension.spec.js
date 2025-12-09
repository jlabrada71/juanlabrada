// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
import StringUtils from '../../lib/string-utils'

describe('Has Extension', () => {
  it('returns true juan.json has extension .json', () => {
    expect(StringUtils.hasExtension('juan.json', '.json')).toBe(true)
  })

  it('returns false juan.json has extension .exe', () => {
    expect(StringUtils.hasExtension('juan.json', '.exe')).toBe(false)
  })

  it('returns false .json has extension .json', () => {
    expect(StringUtils.hasExtension('.json', '.json')).toBe(false)
  })

  it('returns false juan has extension .json', () => {
    expect(StringUtils.hasExtension('juan', '.json')).toBe(false)
  })
})
