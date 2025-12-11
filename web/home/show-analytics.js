import { count,  partition, removeDuplicate, addField, getDayFromTS } from './lib/analytics/functions.js';
import fs from 'fs';

let rawdata = fs.readFileSync('./analytics.json');
let data = JSON.parse(rawdata);

const values = data;

const countryCounts = count('countryCode', values);
console.log('COUNTRIES');
console.log(countryCounts);

const referrerCounts = count('referrer', values);
console.log('REFERRERS');
console.log(referrerCounts);

const ipCounts = count('ip', values);
console.log('IPs');
console.log(ipCounts);

const userIdCounts = count('userId', values);
console.log('userIds');
console.log(userIdCounts);

const domainCounts = count('domain', values);
console.log('DOMAINS');
console.log(domainCounts);

const singleIp = removeDuplicate('ip', values);

const domainPartition = partition('domain', 'countryCode', singleIp);
console.log('Particion by domain');
console.log(domainPartition);

const domainPartitionNoDuplicate = partition('domain', 'countryCode', singleIp);
console.log(domainPartitionNoDuplicate);

console.log('Visitors by Date');
const ipByDate = addField(values, 'ts', 'date', (ts) => getDayFromTS(ts).full );
const domainPartitionByDate = partition('domain', 'date', ipByDate);
console.log(domainPartitionByDate);

console.log('New visitors by Date');
const singleIpByDate = addField(singleIp, 'ts', 'date', (ts) => getDayFromTS(ts).full );
const singleIDomainPartitionByDate = partition('domain', 'date', singleIpByDate);
console.log(singleIDomainPartitionByDate);