import { count,  partition, removeDuplicate, getDayFromTS, addField } from '../lib/analytics/functions.js'

describe ('Echo function ', () => {
  it ('should return the date from the TS', async () => {
    const ts = 1689100843310;
    const date = getDayFromTS(ts);
    expect(date.year).toBe(2023);
    expect(date.month).toBe(7);
    expect(date.day).toBe(11);
    expect(date.full).toBe('2023/7/11');
  });
  
  it ('should return the date from the TS', async () => {
    const ts = 1704844013608
    const date = getDayFromTS(ts)
    expect(date.year).toBe(2024)
    expect(date.month).toBe(1)
    expect(date.day).toBe(9)
    expect(date.full).toBe('2024/1/9')
  });
})


describe ('Echo function ', () => {
  it ('should return the same message', async () => {
    const data = await import('../analytics.json')
    expect(Object.keys(data).length).toBe(1)
    expect(Object.keys(data)[0]).toBe('default')
    const values = data.default
    const dataOne = values[0]
    expect(Object.keys(dataOne).length).toBe(9)
    expect(Object.keys(dataOne)[0]).toBe('_id')
    expect(Object.keys(dataOne)[1]).toBe('url')
    expect(Object.keys(dataOne)[2]).toBe('userId')
    expect(Object.keys(dataOne)[3]).toBe('ts')
    expect(Object.keys(dataOne)[4]).toBe('timeStamp')
    expect(Object.keys(dataOne)[5]).toBe('ip')
    expect(Object.keys(dataOne)[6]).toBe('ua')
    expect(Object.keys(dataOne)[7]).toBe('referrer')
    expect(Object.keys(dataOne)[8]).toBe('countryCode')

    const countryCounts = count('countryCode', values)
    console.log(countryCounts)
    const referrerCounts = count('referrer', values)
    console.log(referrerCounts)
    const ipCounts = count('ip', values)
    console.log(ipCounts)

    const domainCounts = count('domain', values)
    console.log(domainCounts)

    const tryyourideasValues = values.filter(value => value.referrer.includes('tryyourideas'))
    const tryyourideasCountryCount = count('countryCode', tryyourideasValues)
    console.log(tryyourideasCountryCount)

    
    const domainPartition = partition('domain', 'countryCode', values)
    console.log(domainPartition)

    const singleIp = removeDuplicate('ip', values)
    const domainPartitionNoDuplicate = partition('domain', 'countryCode', singleIp)
    console.log(domainPartitionNoDuplicate)

    const singleIpByDate = addField(singleIp, 'ts', 'date', (ts) => getDayFromTS(ts).full )
    const domainPartitionByDate = partition('domain', 'date', singleIpByDate)
    console.log(domainPartitionByDate)
  
  })
})
