'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const foo1 = require('./foo')
test('basic', function () {
  expect((0, foo1.sum)()).toBe(0)
})
test('basic again', function () {
  expect((0, foo1.sum)(1, 2)).toBe(3)
})
