export function count(key, data) {
  const result = {}
  data.forEach(value => {
    const key2 = value[key]
    if (key2)
      result[key2] = result[key2] ?  result[key2] + 1 : 1
  })
  return result
}

export function removeDuplicate(key, data) {
  const result = []
  const counted = {}
  data.forEach(value => { 
    if(!counted[value[key]]) {
      counted[value[key]] = 1
      result.push(value)
    }
  })
  return result
}

export function partition(key1, key2, data) {
  const key1Values = count(key1, data)
  for(const sample in key1Values) {
    const keyData = data.filter(value => value[key1] === sample)
    key1Values[sample] = count(key2, keyData)
  }

  return key1Values
}

export function getDayFromTS(ts) {
  const date = new Date(ts)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const full = `${year}/${month}/${day}`
  return { year, month, day, full }
}

export function addField(data, field, newName, fun) {
  return data.map(item => ({...item, [newName]: fun(item[field])}))
}