import { createClient } from 'redis';

const client = createClient({
    // url: 'redis://juanlabradaservicescache.uluyes.clustercfg.use2.cache.amazonaws.com:6379'
    // url: 'redis://juanlabradaservicescache-0001-001.uluyes.0001.use2.cache.amazonaws.com:6379'
    url: 'redis://localhost:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'myvalue');
const value = await client.get('key');

console.log(value);

await client.hSet('user-session:123', {
    name: 'John',
    surname: 'Smith',
    company: 'Redis',
    age: 29
})

let userSession = await client.hGetAll('user-session:123');
console.log(JSON.stringify(userSession, null, 2));