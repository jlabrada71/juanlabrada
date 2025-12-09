---
title: Functional programming examples
description: Some examples of solving problem using functional programming style.
slug: functional-programming-examples
tags: ['design patterns','experiments']
---
# Functional programming examples

How to change an object key without modifying the object
----------------------------------------------------------------------------
```
const assoc = (key, value, object) => ({
  ...object, [key]: value
});
```

  