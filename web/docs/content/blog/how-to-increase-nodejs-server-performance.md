---
title: How to increase NodeJS server performance
description: undefined
slug: how-to-increase-nodejs-server-performance
tags: ['design patterns','system design','product development']
---
# How to increase NodeJS server performance

Node.js works in single-threaded, non-blocking performance, working as a single process in CPU. No matter how powerful server is used and the resources utilized, what a single-threaded process can do is limited. Node.js is designed for building distributed applications with multiple nodes, hence the name Node.js.
Workload is one of the main reasons we start scaling our application, including availability and fault tolerance among others. Scaling can be done in multiple ways, one of the easiest available solution is Cloning. We can perform cloning using Cluster Module provided by Node.js.  (https://nodejs.org/dist/latest-v14.x/docs/api/cluster.html)[cluster]
Before we start handling requests with our resource-utilized Node.Js server, let’s take the basics of how the Cluster module works.
How Cluster Module Works?
----------------------------------------
The cluster module has got two types of processes, Master and Worker. All incoming requests are handled by Master process and Master process decides which Worker should handle the incoming requests. Worker process can be thought of as normal Node.Js single instance server which serves the requests.
How does Master process distribute the incoming connections?
The first method (and the default one on all platforms except Windows), is the round-robin approach, where the master process listens on a port, accepts new connections, and distributes them across the workers in a round-robin fashion, with some built-in smarts to avoid overloading a worker process.
2. The second approach is where the master process creates the listen socket and sends it to interested workers. The workers then accept incoming connections directly.
The second approach should, in theory, give the best performance. In practice, however, distribution tends to be very unbalanced due to operating system scheduler vagaries. Loads have been observed where over 70% of all connections ended up in just two processes, out of a total of eight.
Creating a Simple Node.js Server
----------------------------------------------
Let’s create a basic Node.js server that handles the request:
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
```
Load Testing this Simple Node.Js Server:
----------------------------------------------
We are going to use ApacheBench Tool, there are other tools that perform similar testing. They can be used according to personal choice.
(https://httpd.apache.org/docs/2.4/programs/ab.html)[ApacheBench Tool]
We are going to hit our Node.js server with 500 concurrent requests for a span of 10 seconds.
```
test_app ab -c 500 -t 10 http://localhost:8080/
```
Apache output:
Percentage of the requests served within a certain time (ms)
 50% 1420
 66% 1422
 75% 1438
 80% 1438
 90% 1624
 95% 1624
 98% 1624
 99% 1625
 100% 2750 (longest request)
This Simple server, on the level of 500 Concurrent requests, a Total of 3502 Requests were served. And 308 requests per second with Time Per Request of 1619(ms) was done.
The number of requests handled is good and it should work for most small to medium scale applications. But we haven’t fully utilized the resources and most of the available resources are sitting idle.

Implementing the Cluster Module
-----------------------------------------------
Now that we are up and running, let’s implement the Cluster for our server.
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
        console.log(`\nWorker ${worker.process.pid} died\n`);
    });
} else {
    // if Worker process, master is false, cluster.isWorker is true
    // worker starts server for individual cpus
    // the worker created above is starting server 
    require(“./server”);
}
```
My personal PC with i7 8th Generation has got 8 processor Cores. Considering that most of the CPUs available nowadays have a minimum of dual-core processor, the resources for the 7 remaining cores were sitting idle*.
If you implemented the above cluster, you will have utilized your full CPU/Server power. The request is handled by Master process from same server port, which will be served by any one of the 8 Worker Processes (Servers).
Load Testing with Cluster Implemented:
----------------------------------------------------
```
➜  test_app ab -c 500 -t 10  http://localhost:8080/
```
ApacheTool Response
Percentage of the requests served within a certain time (ms)
  50%    241
  66%    244
  75%    246
  80%    247
  90%    251
  95%    259
  98%    283
  99%    290
 100%    371 (longest request)

Remember the above simple Node.js server which handled 308 Requests Per Seconds on our load test now that number has increased to 2037 Requests Per Seconds that’s an outstanding 6X Increase in the number of requests handled. Also, previously Time per Request was 1619 ms now it has been decreased to 245ms. We were serving a Total of 3502 Requests before, now it has increased to a Total of 20374 Requests (That’s 5.8X increase). If you look at the implementation above this great improvement is caused by 10 lines of code. And we also didn’t have to refactor our existing server code.



  