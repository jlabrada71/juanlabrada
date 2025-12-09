---
title: How to use curry functions to improve code
description: undefined
slug: how-to-use-curry-functions-to-improve-code
tags: ['refactoring','design patterns']
---
# How to use curry functions to improve code

Refactore this
------------------------------------------
function filterByName(list, name) {
  return list.filter(function(nameToFilter) {
    // nameToFilter is declared at this point
    return function(item) {
      // item is declared here
      return item.name !== nameToFilter;
    }
  }(name));
}
Into this
------------------------------------------
// Generic curried functions
const filter = predicate => array => array.filter(predicate);
const filterBy = propertyName => propertyValue =>
    filter(item => item[propertyName] === propertyValue);

// Usage:
const filterByName = filterBy("name");
const filterByNameJohn = filterByName("John");

console.log(filterByNameJohn(list));

  