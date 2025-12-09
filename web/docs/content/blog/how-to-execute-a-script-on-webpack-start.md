---
title: How to execute a script on webpack start?
description: undefined
slug: how-to-execute-a-script-on-webpack-start
tags: ['design patterns','product development']
---
# How to execute a script on webpack start?


For solving this you need the help of the  'webpack-shell-plugin'
```
const WebpackShellPlugin = require('webpack-shell-plugin');
module.exports = {
  ...
  plugins: [
    new WebpackShellPlugin({
      onBuildStart:['node prepare.js']
    })
  ],
  ...
}
```

or you can also use brute force:
'node prepare.js & webpack'

  