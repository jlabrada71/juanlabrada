---
title: Notes on Nuxt Content
description: Note on the Nuxt Content conf by Dan Pastori
createdAt: '12/12/2024'

slug: nuxt-content-notes
tags: ['Nuxt', 'NuxtJS', 'Nuxt Content', 'Blog']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'Nuxt, NuxtJS, Content, Blog'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '12/12/2024'
---

# What can be used Nuxt content for
- Marketing
- Documentation
- 
# Document Driven vs In-app Install
- In-app install integrates best to applications
- Document driven mode revolves around the structure of your content.
- Document driven mode has Heavy use of MDC (Markdown Components)
- Just write content and it renders
# When to use Document Driven Mode?
- Documentation Sites
- Blogs
- Landing pages
- Any site where "Content is King"

# Nuxt Content Breakdown
## querying content
```js
const blogs = await queryContent("blog")
  .sort({ published_at: -1 })
  .find();
```

## Adding functional components to your install
```js
// CodePanel.vue
<template>
  <div>
    <div>
      <h3 v-if="label!=''">{{ label }} </h3>
    </div>
    <h2>tag: {{ tag }}</h2>
    <h3>code: {{ code }}</h3>
    <div class="group gb-white/2.5">
      <div class="relative overflow-x-auto p4 text-xs text-white">
        <ContentSlot :use="$slots.default" />
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    code: {
      return: ''
    },
    tag: {
      return: ''
    },
    label: {
      return: ''
    },
  });
</script>
```
```
// markdown file
This is a text
::code-panel
---
label: "Default Command"
tag: "This is the tag"
code: "This is the code"
---
this is rendered by the MarkDown Processor using the component defined styles
::

This is outside the component rendered using prosed defined styles
```

## Using the provided components
- < ContentDoc> : displays content for the current URL or a specific path
- < ContentList> : Displays a list of content. Great for navigation, search result, indexes.
```html
<ContentList path="/blog" v-slot="{ list }">
  <div v-for="post in list" :key="post._path">
    <h2>{{ post.title }}</h2>
  </div>
</ContentList>
```

- < ContentQuery>: Allows you to pass query parameters to the component and display the results
```html
<ContentQuery :path="$route.path" find="one" v-slot="{ data }">
  <ContentRenderer :value="data" />
</ContentQuery>
```
## Going to production
- SSR vs Static
- Nuxt Content cannot be used in SPA mode. Utilizes pre-rendering of content
- Can also run through and generate a static site. Perfect for super fast load times. Common with DocumentDrivenMode.
## Helpfun Modules
- Nuxt OG Image (https://nuxt.com/modules/og-image) Automatically generates OG Images.
- Nuxt Social Share (https://nuxt.com/modules/nuxt-social-share) Add quick links for sharing on social networks.
- Nuxt Image (https://nuxt.com/modules/image) Quickly Optimize Content Image