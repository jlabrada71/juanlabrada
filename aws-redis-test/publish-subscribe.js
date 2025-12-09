'use strict';

import { createClient } from 'redis';

const client = createClient({
    // url: 'redis://juanlabradaservicescache.uluyes.clustercfg.use2.cache.amazonaws.com:6379'
    // url: 'redis://juanlabradaservicescache-0001-001.uluyes.0001.use2.cache.amazonaws.com:6379'
    url: 'redis://localhost:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

const subscriberClient = client.duplicate();
subscriberClient.on('error', err => console.error(err));

await client.connect();

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function subscribing() {
    
    await subscriberClient.connect();

    const listener = (message, channel) => console.log(message, channel);
    await subscriberClient.subscribe('channel', listener);

    setTimeout(async () => {
        console.log('Unsubscribing');
        await subscriberClient.unsubscribe('channel', listener);

    }, 10000);
}

async function publishing() {
    setTimeout(async () => {
        await client.publish('channel', 'message0');
        await client.publish('channel', 'message0-1');
        await client.publish('channel', 'message0-2');
    }, 2000);

    setTimeout(async () => {
        await client.publish('channel', 'message1');
        await client.publish('channel', 'message1-1');
    }, 1000);

    setTimeout(async () => {
        await client.publish('channel', 'message2');
    }, 5000);
}

subscribing();
publishing();