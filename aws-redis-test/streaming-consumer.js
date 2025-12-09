'use strict';

import { createClient, commandOptions } from 'redis';

const client = createClient({
    // url: 'redis://juanlabradaservicescache.uluyes.clustercfg.use2.cache.amazonaws.com:6379'
    // url: 'redis://juanlabradaservicescache-0001-001.uluyes.0001.use2.cache.amazonaws.com:6379'
    url: 'redis://localhost:6379'
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

const STREAMS_KEY = "weather_sensor:wind";

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function createGroup(client, streamKey, applicationId) {
    try {
        await client.xGroupCreate( streamKey, applicationId, '0', {   // instead of '0' you can use '$' to get all recent messages
            MKSTREAM: true
        });
    }
    catch (err) {
        if (err) {
            if (err.code == 'BUSYGROUP' ) {
                console.log(`Group ${applicationId} already exists`);
            } else {
                console.log(err);
            }
        }
    }
}

class Consumer {
    constructor(client, streamKey, applicationId, consumerId) {
        this.client = client;
        this.streamKey = streamKey;
        this.applicationId = applicationId;
        this.consumerId = consumerId;
    }

    async consume() {


        let done = false;
        while (!done) {
            try {
                const response = await this.client.xReadGroup( commandOptions({
                        isolated: true
                    }),
                    this.applicationId, 
                    this.consumerId, [
                        // XREADGROUP can read from multiple streams, starting at a
                        // different ID for each...
                        {
                        key: this.streamKey,
                        id: '>' // Next entry ID that no consumer in this group has read
                        }
                    ], {
                        // Read 1 entry at a time, block for 5 seconds if there are none.
                        COUNT: 1,
                        BLOCK: 5000
                    });
            
                if (response) {
                    // Response is an array of streams, each containing an array of
                    // entries:
          
                   //  console.log(JSON.stringify(response, null, 2   ));
            
                    // Use XACK to acknowledge successful processing of this
                    // stream entry.
                    // https://redis.io/commands/xack/
                    const entryId = response[0].messages[0].id;
                    const messageId = response[0].messages[0].message.i;
                    await sleep(response[0].messages[0].message.delay);
                    await this.client.xAck(this.streamKey, this.applicationId, entryId);
            
                    console.log(`Acknowledged processing of entry for application: ${this.applicationId}, ${this.consumerId}  id: ${entryId}, message id: ${messageId}.`);
                    
                } else {
                    // Response is null, we         // in the stream right now...
                    console.log(`No new stream entries.${this.applicationId}, ${this.consumerId} application:  `);
                    done = true;
                }
            } catch (err) {
                console.error(err);
                done = true;
            }
        }  
    }
}

const consumer11 = new Consumer(client, STREAMS_KEY, "app1", 'consumer-1:1');
const consumer21 = new Consumer(client, STREAMS_KEY, "app2", 'consumer-2:1');
const consumer12 = new Consumer(client, STREAMS_KEY, "app1", 'consumer-1:2');
const consumer22 = new Consumer(client, STREAMS_KEY, "app2", 'consumer-2:2');
const consumer23 = new Consumer(client, STREAMS_KEY, "app2", 'consumer-2:3');

const consumers = [consumer11.consume(), consumer21.consume(), consumer12.consume(), consumer22.consume(), consumer23.consume()];
await Promise.allSettled(consumers);
console.log('All consumers have finished');
await client.quit();
