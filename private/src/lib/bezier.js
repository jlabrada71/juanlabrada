
export default class Bezier {
  line (p1, p2, t) {
    const x = p1.x * (1 - t) + p2.x * t
    const y = p1.y * (1 - t) + p2.y * t
    return { x, y }
  }

  bezier3 (a, b, c, t1) {
    const t2 = 1 - t1
    const t11 = t1 * t1
    const t21 = t1 * t2
    const t22 = t2 * t2
    const x = t22 * a.x + t21 * b.x + t21 * b.x + t11 * c.x
    const y = t22 * a.y + t21 * b.y + t21 * b.y + t11 * c.y

    return { x, y }
  }

  bezier4 (a, b, c, d, t1) {
    const t11 = t1 * t1
    const t111 = t11 * t1

    const t2 = 1 - t1
    const t22 = t2 * t2
    const t222 = t22 * t2

    const x = a.x * t222 + 3 * t22 * t1 * b.x + 3 * t2 * t11 * c.x + t111 * d.x
    const y = a.y * t222 + 3 * t22 * t1 * b.y + 3 * t2 * t11 * c.y + t111 * d.y

    return { x, y }
  }

  bezier5 (a, b, c, d, e, t1) {
    const t2 = 1 - t1
    const t11 = t1 * t1
    const t111 = t11 * t1
    const t1111 = t111 * t1
    const t22 = t2 * t2
    const t222 = t22 * t2
    const t2222 = t222 * t2
    const x = a.x * t2222 + 4 * t222 * t1 * b.x + 6 * t22 * t11 * c.x + 4 * t2 * t111 * d.x + t1111 * e.x
    const y = a.y * t2222 + 4 * t222 * t1 * b.y + 6 * t22 * t11 * c.y + 4 * t2 * t111 * d.y + t1111 * e.y
    return { x, y }

    // (1-t)^4 A + 4(1-t)^3 t B + 6(1-t)^2 t^2 C + 4(1-t) t^3 D + t^4 E
  }

  bezier (l, t) {
    /*
    p(t) = sum i=0-n ( (n! / i!(n-i)!)*(1-t)^(n-i)*t^i*Ai  )

    */
    if (l.length === 3) return this.bezier3(l[0], l[1], l[2], t)
    const result = []
    let i = 0
    while (i < l.length - 2) {
      result.push(this.bezier3(l[i], l[i + 1], l[i + 2], t))
      i += 1
    }
    return this.bezier(result, t)
  }
}
