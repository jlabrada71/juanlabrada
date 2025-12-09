---
title: How to use a MermaidJS to show diagrams in a Nuxt content document
description: A step by step guide to use MermaidJS to show diagrams in a Nuxt content document
createdAt: '09/19/2024'

slug: mermaidjs-nuxt-content
tags: ['mermaidjs','nuxt', 'content']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'mermaid js, nuxt content'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '09/19/2024'
---

# Steps

install vue-mermaid-string (I'm using version 6.0)

Create a component in the ./components/content folder  'ShowDiagram.vue'

```
<script setup>
import VueMermaidString from 'vue-mermaid-string';

const props = defineProps({
  diagram: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <VueMermaidString :value="diagram" />
</template>

<style scoped>
</style>
```

Create your md document

and where you want the diagram add this code:

 ::show-diagram
 ---
 diagram: stateDiagram 
    [*] --> Still 
    Still --> [*] 
    Still --> Moving 
    Moving --> Still 
    Moving --> Crash 
    Crash --> [*] 
 ---
 ::

Depending on the type of diagram, you might need to add empty lines to force nuxt content to add <newline> after the line. Otherwise, it contact the lines and the diagram doesnt render.

Also, if your diagram requires a colon ':' it can not be used, since colons are part of the component mapping.
