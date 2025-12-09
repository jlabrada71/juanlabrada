'use strict';

import { createClient } from 'redis';

const client = createClient({
    // url: 'redis://juanlabradaservicescache.uluyes.clustercfg.use2.cache.amazonaws.com:6379'
    // url: 'redis://juanlabradaservicescache-0001-001.uluyes.0001.use2.cache.amazonaws.com:6379'
    url: 'redis://localhost:6379'
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

const STREAMS_KEY = "weather_sensor:wind";

async function produce() {

    const sleep_time = 200;
    const loop_nb = 20;
   
    console.log(`\nThis program will send ${loop_nb} messages, every ${sleep_time}ms`);

    for (let i = 0 ; i <= loop_nb ; i++) {
        console.log(`\tSending message ${i}`);

        // create the message values:
        const speed = Math.round(Math.random() * 45);
        const direction = Math.round(Math.random() * 359);
        const delay = Math.round(Math.random() * 5) * 100;
        const ts = (new Date()).getTime();

        await client.xAdd(
            STREAMS_KEY,
            '*', // * = Let Redis generate a timestamp ID for this new entry.
            // Payload to add to the stream:
            {
              i: i.toString(),
              speed: speed.toString(), 
              direction: direction.toString(),
              sensor_ts: ts.toString(),
              loop_info: i.toString(),
              delay: delay.toString()

              // Other name/value pairs can go here as required...
            }
          );

        // // produce the message
        // await client.xAdd(STREAMS_KEY, '*', {
        //     'speed': speed.toString(),  
        //     'direction': direction.toString,  
        //     'sensor_ts': ts.toString(), 
        //     'loop_info': i.toString()
        // });

    }
}

await produce();
await client.quit();
