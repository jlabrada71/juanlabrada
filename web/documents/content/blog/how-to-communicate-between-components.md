---
title: How to communicate between components
description: undefined
slug: how-to-communicate-between-components
tags: ['vue','web design']
---
# How to communicate between components

[Original article](https://javascript.plainenglish.io/communication-between-components-in-vue-js-d79124917cd0)
There are five ways to send the data from one component to another:
1. Using Props (Parent to Child Communication)
2. Using Events (Child to Parent Communication)
3. Using Event Bus (Communication between any components)
4. Using provide/inject (Parent to Child Communication)
5. Using this.$refs (Parent to Child Communication)

3) Using Event Bus (Communication between any two components)
-------------------------------------------------------------------------------------------
With Vue 3 this is also not possible any longer to send events. If you like to do so, you have to use a third party project like Mitt.
https://github.com/developit/mitt

4 Provide-Inject
----------------------------------
https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity




  