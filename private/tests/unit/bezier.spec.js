import Bezier from '@/lib/bezier.js'

describe('Three Points Bezier', () => {
  it('line', () => {
    const b = new Bezier()
    const p1 = { x: 100, y: 100 }
    const p2 = { x: 100, y: 10 }
    const p3 = { x: 10, y: 10 }

    const i0 = b.line(p1, p2, 0)
    expect(i0).toMatchObject(p1)

    const i1 = b.line(p1, p2, 1)
    expect(i1).toMatchObject(p2)

    const i3 = b.line(p1, p2, 0.5)
    expect(i3).toMatchObject({ x: 100, y: 55 })

    const j0 = b.line(p2, p3, 0)
    expect(j0).toMatchObject(p2)

    const j1 = b.line(p2, p3, 1)
    expect(j1).toMatchObject(p3)

    const j3 = b.line(p2, p3, 0.5)
    expect(j3).toMatchObject({ x: 55, y: 10 })

    const b0 = b.line(i0, j0, 0)
    expect(b0).toMatchObject(i0)

    const b1 = b.line(i1, j1, 1)
    expect(b1).toMatchObject(j1)

    const b3 = b.line(i3, j3, 0.5)
    expect(b3).toMatchObject({ x: 77.5, y: 32.5 })
  })

  it('bezier3', () => {
    const b = new Bezier()
    const p1 = { x: 100, y: 100 }
    const p2 = { x: 100, y: 10 }
    const p3 = { x: 10, y: 10 }

    const b0 = b.bezier3(p1, p2, p3, 0)
    expect(b0).toMatchObject(p1)

    const b1 = b.bezier3(p1, p2, p3, 1)
    expect(b1).toMatchObject(p3)

    const b3 = b.bezier3(p1, p2, p3, 0.5)
    expect(b3).toMatchObject({ x: 77.5, y: 32.5 })
  })

  it('bezier', () => {
    const b = new Bezier()
    const p1 = { x: 100, y: 100 }
    const p2 = { x: 100, y: 10 }
    const p3 = { x: 10, y: 10 }
    const l = [p1, p2, p3]

    const b0 = b.bezier(l, 0)
    expect(b0).toMatchObject(p1)

    const b1 = b.bezier(l, 1)
    expect(b1).toMatchObject(p3)

    const b3 = b.bezier(l, 0.5)
    expect(b3).toMatchObject({ x: 77.5, y: 32.5 })
  })
})
