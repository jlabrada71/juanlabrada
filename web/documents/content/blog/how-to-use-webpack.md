---
title: How to use webpack
description: Webpack is the best tool to bundle resources for javascript. It makes easy to organize your resources and bundle them into files that are ready for production. Also, it has a very flexible plugin system that extends its functionality beyond its core.
 
slug: how-to-use-webpack
tags: ['Code Generation','system design']
---
# How to use webpack

How to create the simplest config for Webpack
====================================

```
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

```
<!-- page.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    ...
  </head>
  <body>
    ...
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

```
// src/index.js
import bar from './bar.js';
bar();
```

```
// src/bar.js
export default function bar() {
  //
}
```
Webpack follows the javascript dependency tree starting from the entry file in the config and puts the final bundle file in the output path with the given file name.


  