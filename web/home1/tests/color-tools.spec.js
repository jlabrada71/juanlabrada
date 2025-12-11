import { contrast, luminance, rgb2hsl, hsl2rgb, hlc2rgb, rgb2hlc } from "@/lib/color-tools.js";

describe('Contrast', () => {
  it('returns the expected contrast', () => {
    const contrast1 = contrast([255, 255, 255], [255, 255, 0]) // 1.074 for yellow
    const contrast2 = contrast([255, 255, 255], [0, 0, 255]) // 8.592 for blue
    expect (contrast1).toBeCloseTo(1.074)
    expect (contrast2).toBeCloseTo(8.592)
  })
})


describe('Luminance', () => {
  it('returns the expected contrast', () => {
    const luminance2 = luminance([255, 255, 0])
    expect (luminance2).toBeCloseTo(0.928)
    const luminance3 = luminance( [0, 0, 255]) 
    expect (luminance3).toBeCloseTo(0.072)
    const luminance1 = luminance([255, 255, 255])  
    expect (luminance1).toBeCloseTo(1)
  })
})

describe('rgb2hsl', () => {
  it('returns the expected contrast', () => {
    const [h, s, l] = rgb2hsl([255, 255, 0])
    expect (h).toBeCloseTo(60)
    expect (s).toBeCloseTo(100)
    expect (l).toBeCloseTo(50)
  })
})

it('returns the expected contrast', () => {
  const [r, g, b] = hsl2rgb([60, 100, 50])
  expect (r).toBeCloseTo(255)
  expect (g).toBeCloseTo(255)
  expect (b).toBeCloseTo(0)
})

describe('hsl2rgb', () => {
  it('returns the expected contrast', () => {
    const [r, g, b] = hsl2rgb([13, 100, 11])
    expect (r).toBeCloseTo(56.1)
    expect (g).toBeCloseTo(12.155)
    expect (b).toBeCloseTo(0)
  })

})

describe('rgb2hlc', () => {
  it('returns the expected contrast', () => {
    const [h, l, c] = rgb2hlc([13, 100, 11])
    expect (h).toBeCloseTo(118.65)
    expect (l).toBeCloseTo(0.22)
    expect (c).toBeCloseTo(0.80)
  })
})

describe('hlc2rgb', () => {
  it('returns the expected contrast', () => {
    const [h, l, c] = hlc2rgb([118.65, 0.22, 0.80])
    expect (h).toBeCloseTo(13)
    expect (l).toBeCloseTo(101)
    expect (c).toBeCloseTo(11)
  })
})
