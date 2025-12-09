---
title: How to multi thread in node.js
description: undefined
slug: how-to-multi-thread-in-node-js
tags: ['design patterns','experiments','system design']
---
# How to multi thread in node.js

Original post
========
https://javascript.plainenglish.io/how-to-do-multithreading-with-node-js-207aabdaddfb

Features
===================
Each thread has separate v8 engines.
Child threads could communicate with each other.
Child threads could share the same memory.
An initial value could be passed as an option while starting the new thread.

Main file 
================

```
/*
*  File Name: index.js
*  Description: This is the main thread
*/
const express = require("express");
const { Worker } = require("worker_threads");
const app = express();
const port = 3000;
const getSum = (limit) => {
let sum = 0;
for (let i = 0; i < limit; i++) {
     sum += i;
}
return sum;
};
app.get("/", (req, res) => {
const result = getSum(1000);
res.send(`Processed function getSum on main thread and result: ${result}`);
});
app.get("/seprate-thread", (req, res) => {
const seprateThread = new Worker(__dirname + "/seprateThread.js");
seprateThread.on("message", (result) => {
res.send(`Processed function getSum on seprate thread: ${result}`);
});
seprateThread.postMessage(1000);
});
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});
```
Worker thread file
======================
```
/*
*  File Name: seprateThread.js
*  Description: This is another thread
*/
const { parentPort } = require("worker_threads");
const getSum = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};
parentPort.on("message", (limit) => {
 const result = getSum(limit);
 parentPort.postMessage(result);
});

```

  