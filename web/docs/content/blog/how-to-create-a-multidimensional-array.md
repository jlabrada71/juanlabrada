---
title: How to create a multidimensional array
description: Creating a Multidimensional array in javascript.
slug: how-to-create-a-multidimensional-array
tags: ['design patterns','experiments']
---
# How to create a multidimensional array

```
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

createArray();     // [] or new Array()

createArray(2);    // new Array(2)

createArray(3, 2); // [new Array(2),
                   //  new Array(2),
                   //  new Array(2)]
```

  