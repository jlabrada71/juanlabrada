---
title: How to render a markdown from database in Nuxt content
description: A better design makes it easier to make changes.
createdAt: '07/12/2023'

slug: how-to-render-markdown-from-database
tags: ['nuxt','content', 'Markdown']
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
    - name: 'publish'
      content: '01/20/2023'
---

# Introduction

You can use @nuxt/content's Markdown transformer to parse an arbitrary string:

```js

// ~/utils/parseMarkdown.js
import markdownParser from '@nuxt/content/transformers/markdown'

// first arg to parse() is for id, which is unused
export const parseMarkdown = md => markdownParser.parse('custom.md', md)

```

Then render it with @nuxt/content's ContentRendererMarkdown component like this:

```js
<script setup>
import { parseMarkdown } from '~/utils/parseMarkdown'

const result = ref(null)
const loadMarkdown = async () => {
  const data = await $fetch('https://example.com/page.md')
  result.value = await parseMarkdown(data)
}
loadMarkdown()
</script>

<template>
  <ContentRendererMarkdown :value="result" v-if="result" />
</template>

```

Consider creating a composable for getting and parsing the markdown


