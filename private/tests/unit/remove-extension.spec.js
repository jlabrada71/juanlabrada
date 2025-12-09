// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';
import StringUtils from '../../lib/string-utils'

describe('Remove Extension FromString', () => {
  it('remove extension from juan.json results in juan', () => {
    expect(StringUtils.removeExtension('juan.json')).toMatch('juan')
  })

  it('remove extension from juan results in juan', () => {
    expect(StringUtils.removeExtension('juan')).toMatch('juan')
  })

  it('remove extension from juan.juan.json results in juan.juan', () => {
    expect(StringUtils.removeExtension('juan.juan.json')).toMatch('juan.juan')
  })

  it('remove extension from .profile results in .profile', () => {
    expect(StringUtils.removeExtension('.profile')).toMatch('.profile')
  })

  it('remove extension from juan. results in juan', () => {
    expect(StringUtils.removeExtension('juan.')).toMatch('juan')
  })
})
