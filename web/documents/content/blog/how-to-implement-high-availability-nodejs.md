---
title: How to implement high availability NodeJS?
description: undefined
slug: how-to-implement-high-availability-nodejs
tags: ['tdd','system design','product development']
---
# How to implement high availability NodeJS?

Availability and Zero Down Time
----------------------------------------------
Excited with the progress we have made so far, now it gets better.
When we have a single instance of server and that server crashes. There will be downtime when the server has to be restarted. Even if the process is automated, there will be delay and not a single request can be served in that time.
Simulating the Server Crashing:
```
/*** server.js ***/
const http = require(“http”);
// get the process ID of Node Server
const processId = process.pid;
// Creating server and handling request
const server = http.createServer((req, res) => {
    // Simulate CPU Work
    for (let index = 0; index < 1e7; index++);
    
    res.end(`Process handled by pid: ${processId}`);
});
// start server and listen the request
server.listen(8080, () => {
    console.log(`Server Started in process ${processId}`);
});
// Warning: Only For Testing and Visualization Purpose
// Don't add the code below in production
// Let's simulate Server Randomly Crashing using process.exit()
setTimeout(() => {
    process.exit(1);
}, Math.random() * 10000);
```
Now for simulation purposes if we add highlighted code above to our server code. And start our server we can see that one by one all server is crashing and eventually the whole process exists. Master Process also exists due to no available Worker. The server could crash and these scenarios could exist due to any problem.

Handling the Zero Down-Time
-----------------------------------------
When we have multiple instances of a server, the availability of the server could be easily increased.
Let’s open up our cluster.js file and add the highlighted code to cluster.js:
```
/** cluster.js **/
const os = require(“os”);
const cluster = require(“cluster”);
if (cluster.isMaster) {
    const number_of_cpus = os.cpus().length;
   
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking Server for ${number_of_cpus} CPUs\n`);
    // Create a Worker Process for each Available CPU
    for (let index = 0; index < number_of_cpus; index++) {
        cluster.fork();
    }
    // When Worker process has died, Log the worker
    cluster.on(“exit”, (worker, code, signal) => {
        /**
        * The condition checks if worker actually crashed and
        * wasn't manually disconnected or killed by master process.
        *
        * The condition can be changed by desired error code,
        * and condition.
        */
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        }
    });
} else {
    // if Worker process, master is false, cluster.isWorker is true
    // worker starts server for individual cpus
    // the worker created above is starting server
    require(“./server”);
}
```
Now, remember this is the case when we have 8 servers created by our Cluster Module. When we have a single instance of server and that crashes, no requests can be served in that time.
Load Testing with Server Restart Implemented:
-------------------------------------------------------------
Let’s run the server with cluster changes implemented (Run: node cluster.js). Now let’s open up our benchmarking tool and start benchmarking our server.
```
➜  test_app ab -c 500 -t 10 -r http://localhost:8080/
```

  