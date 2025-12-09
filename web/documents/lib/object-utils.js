export function copyData (source, target = {}) {
  const data = target
  const keys = Object.keys(source)
  keys.forEach((key) => { if (typeof source[key] !== 'function') { data[key] = source[key] } })
  return data
}
