'use strict'
Object.defineProperty(exports, '__esModule', { value: true })

const sum = function () {
  const a = []
  for (let i = 0; i < arguments.length; i++) {
    a[i] = arguments[i]
  }
  return a.reduce(function (acc, val) { return acc + val }, 0)
}
exports.sum = sum
