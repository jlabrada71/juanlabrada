---
title: How to debug a node application
description: undefined
slug: how-to-debug-a-node-application
tags: ['Productivity']
---
# How to debug a node application


1- Install a v8 debugger chrome extension:

https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj

2- Open the extension

3- execute the file to debug

```
node --inspect-brk ./node_modules/gulp/bin/gulp build-dev
```

4- Open the extension and in there the localhost tab

5- move the mouse over the file name you are debugging. ex:  ./node_modules/gulp/bin/gulp

6- a tooltip with the debugger url will appear.

7- Click on the file name in step 5 to stick the tooltip

8- copy the devtools url that appears in the tooltip

9-  pasted in a new browser tab

When the application finishes the message 'Waitin for the debuggger to disconnect' will appear in the console.

Open the V8 extension again and click remove button in localhost

  