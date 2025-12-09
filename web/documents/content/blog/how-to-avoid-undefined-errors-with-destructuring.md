---
title: How to avoid undefined errors with destructuring
description: undefined
slug: how-to-avoid-undefined-errors-with-destructuring
tags: ['refactoring','design patterns']
---
# How to avoid undefined errors with destructuring

Null problems
```
const getTemperature = (atticData) => atticData.celsius ||15;
```
Using null coalescing  (slightly better)
```
const getTemperature = (atticData) => atticData?.celsius ?? 15;
```
Use destructuring to solve the null issue
```
const getTemperature = ({ celsius = 15 } = {}) => celsius;
```

It is slightly cleaner, and it actually got more general in that it doesn’t necessarily lie about what it operates on. We avoid naming that. Any potential object could be given to this function, and it would attempt to safely extract a celsius.

Whenever you type a dot, stop and think about if you could already have destructured out the value you’re after.
Destructure at extreme:

```
const func = (
  {
    fallbackMessage: msg = 'Unknown',
    offset = 4,
    pos: { x = 0, y = 0 } = {},
    ...options
  } = {},
  data = {},
) => {
  const { title = '', items: [head, ...tail] = [] } = data;
  // some nice logic
};
```

This function utilizes destructuring features in different ways. Let’s analyze:

Setting defaults at the first/highest level (argument list) makes sure we can’t crash for empty arguments: func(). (This is “default parameters” that nicely work the same way as destructuring defaults).

Rename long key names for more readable logic when using the value (msg).

Use nested destructuring if you only need what’s inside a member value. But again, remember to also add a default to make the destructuring safe from crashing should the member value not exist.

It is powerful to also use the rest operator to be able to handle everything that was not explicitly destructured.

If we both need to use the whole structure and values inside, we destructure in the function scope (otherwise in the function header — as early as possible).

Both destructuring & the rest operator can be used for arrays as well.

We don’t have to repeat a long expression options.pos.x for a value if it’s used multiple times in the scope. Instead, just x. Cleaner, safer and also more performant in that JS doesn’t have to dig out the value each time.

Every time you type a dot . — stop and think about if this is data that you’re operating on. If so — use destructuring instead.

Destructure as early as possible.

Remember to include default values, especially in nested destructuring.

Null breaks default parameters.
However, destructuring defaults work the same way, which means they also only fall back to the defaults for undefined — not for null.

This is actually because it is the correct way


**undefined** in JavaScript means that the value is not yet set, it is not defined. All uninitialized values get the value undefined at run time.

**null** is an identifier that means that the value is actually set, but for some reason it could not get a proper value. Historically, null was included in the language for when one wanted to clear a variable containing (referencing) an object and let garbage collection destroy it. That’s why its type is "object". null is different from undefined and does not mean the same thing (and should not in your code).

### Another example

```
// item and items are predefined
const parent = items[item.parent];
const types = parent.types;
const name = parent.name;
```
### Using default parameters

```

const parentId = item.parent;
const parent = parentId ? (items[parentId] || {}) : {};
const types = parent.types || [];
const name = parent.name || 'Noname';
```

### Using destructuring


```
const { parent: parentId } = item;
const { [parentId]: { types = [], name = 'Noname' } = {} } = items;
```
Explanation:

const  {parent: parentId } = item;

Destructures item, using parentId as the variable for the value of parent field.

const { [parentId]: { types = [], name = 'Noname' } = {} } = items;

[parentId] gets the value in the position parentId from array items.

: { types = [], name = 'Noname'} destructures the value returned by [parentId], defining default values for each case.

= {}  defines a default value in case [parentId] is undefined.



null should not be used in JavaScript.




  