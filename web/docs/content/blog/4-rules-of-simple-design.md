---
title: 4 Rules of Simple Design
description: A better design makes it easier to make changes.

slug: 4-rules-of-simple-design
tags: ['design principles','tdd']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'design'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
---
# 4 Rules of Simple Design

## Passing Tests

The faster you can find what’s broken, the faster you can change it. Test driven development (TDD) tells you exactly what method broke when you removed or added a new piece of code. Without tests, your code design isn’t good.
(Runs all the tests)

## Reveals Intent

Good design makes it really easy to understand the code’s intent. Having really good names for your methods is essential for this rule. The faster you can figure out what the intent of the broken code was, the faster you can fix it when making changes.
(Expresses every idea that we need to express)


## No Duplication (DRY)

How many places in your code do you need to change if only one requirement changes? You want to minimize that number to only one place.
(Says everything once and only once)


## Keep It Small

It’s OK to delete code you don’t need anymore. Sure, you spent a whole day on it, but it’s OK. Just delete it. Don’t comment it out and leave it there. Just DELETE IT. This keeps your code clean for when you’re going through it to make changes.
(Has no superfluous parts)


  