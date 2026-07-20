import { describe, it, expect } from 'vitest'
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
    const data = [{
        "_id": "6966f888751a95b4858bd4df",
        "name": "CLS",
        "value": 1.382059114028968e-7,
        "rating": "good",
        "delta": 1.382059114028968e-7,
        "entries": [],
        "id": "v3-1768355616074-4676374218577",
        "navigationType": "reload",
        "userId": "9d0317cd-eaf5-4e6d-9093-deaf50d4da13",
        "ts": 1768355973512,
        "timeStamp": "Tue Jan 13 2026 22:59:33 GMT-0300 (Brasilia Standard Time)",
        "ip": "::1",
        "ua": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "referrer": "tryyourideas.comq",
        "countryCode": "Unknown"
    }];


    const countryCounts = count('countryCode', data)
    console.log(countryCounts)
    const referrerCounts = count('referrer', data)
    console.log(referrerCounts)
    const ipCounts = count('ip', data)
    console.log(ipCounts)

    const domainCounts = count('domain', data)
    console.log(domainCounts)

    const tryyourideasValues = data.filter(value => value.referrer.includes('tryyourideas'))
    const tryyourideasCountryCount = count('countryCode', tryyourideasValues)
    console.log(tryyourideasCountryCount)

    
    const domainPartition = partition('domain', 'countryCode', data)
    console.log(domainPartition)

    const singleIp = removeDuplicate('ip', data)
    const domainPartitionNoDuplicate = partition('domain', 'countryCode', singleIp)
    console.log(domainPartitionNoDuplicate)

    const singleIpByDate = addField(singleIp, 'ts', 'date', (ts) => getDayFromTS(ts).full )
    const domainPartitionByDate = partition('domain', 'date', singleIpByDate)
    console.log(domainPartitionByDate)
  
  })
})
