module.exports=function (wallaby) {
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
      }
    },
    testFramework: {
     configFile: './jest.config.wallaby.js'
    }
  }
}