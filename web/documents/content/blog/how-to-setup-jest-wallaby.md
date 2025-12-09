---
title: How to setup a project with Jest and Wallaby
description: Creating a project with Jest and Wallaby can be sometimes tricky. This note tries to go step by step through the process.
createdAt: '01/20/2023'

slug: how-to-setup-jest-wallaby
tags: ['Jest','tdd', 'Wallaby']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'test, jest, wallaby'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '06/27/2023'
---

# Project Setup
```
mkdir project
cd project
npm init -y
npm install jest --save-dev
```

## Create some tests
- create tests folder
- create file 'first.spec.js' in tests folder 
```js
describe('test', () => {
  it ('test', () => {
    expect (true).toBe(true)
  })
})
```

- Modify package.json to add script to run tests

```json
  "scripts": {
    "test": "jest"
  },
```

In the terminal execute 'npm run test', and verify that the first test runs and passes.

- add another file  'second.spec.js' in tests folder

```js
import { echo } from '../src/echo.js'

describe('echo', () => {
  it ('should return "msg"', () => {
    expect (echo('msg')).toBe('msg')
  })
})

```

- create src folder
- add a file in the src folder 'echo.js'

```js
export function echo(msg) {
  return msg
}

```

- if you execute 'npm run test' now you get an error because 'import ' is not recognized by jest
- now you need to do two changes to the 'package.json' file.
- first, you need to define the package as type module and also you need to tell jest to run with the experimental modules feature.
- for this modify the package.json file as follows:

```
  "type":"module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  ```

  - now execute 'npm run test' again and both tests should pass
  - if now you configure and start wallaby, the first test will run well, but the second will show the marks in white
  - this happens because wallaby is running jest with the default configuration and not using the experimental modules
  - if you open wallaby output console, you can see the same error as when we were running the tests using npm.
  - Let create a wallaby config file for configuring the experimental modules.
  - create a file wallaby.js with the following content:

  ```js
  module.exports = function (wallaby) {
  return {
    autoDetect: true,
    runAllTestsWhenNoAffectedTests: true,
    files: [
      'src/**/*.js' // adjust if required
    ],

    tests: [
      'tests/**/*.spec.js' // adjust if required
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: '--experimental-vm-modules'
      },
    },
  }
}
  ```

  it tells wallaby that when running node it should enable the experimental modules.
  Press shift+control+p to open the command window
  From there select 'Wallaby: Select configuration'
  It shows a list of configuration options including the file that we just created
  Then select 'wallaby.js' from the list
  After this you will see an error in the Wallaby output console:

      ​[Error] Failed to load configuration file: ​​
      ​[Error] -----------------------------​​
      [Error] CommonJs config loading error​​
      [Error] -----------------------------​​
      [Error] Instead rename wallaby.js to end in .cjs, change ...

- Now rename the wallaby.js to wallaby.cjs and repeat the Select configuration step, selecting in this case wallaby.cjs file.
- Now you see the second test in green in VSCode.

For some 'wallaby.js' the recommended name for the wallaby configuration file is executed with error. Probably that's a consequense of trying to make wallaby as generic as possible.

Another issue we can see is that wallaby is not able to identify the configuration file automatically in the project folder. This is problematic since you might assume that it works like other frameworks, 'jest' for example, that are able to read the configuration file when it is present.

You can create the wallaby.cjs file directly, instead of creating first the wallaby.js, but for this document I wanted to show the issue with the recommended steps.


 [/about](/blog/about).

