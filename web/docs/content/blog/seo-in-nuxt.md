---
title: Notes on SEO in Nuxt JS
description: How to set SEO in Nuxt
createdAt: '12/12/2024'

slug: seo-in-nuxt
tags: ['SEO','Nuxt', 'NuxtJS', 'Search Engine Optimization']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'SEO, Search Engine Optimization, Nuxt, NuxtJS'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2024 Juan Labrada'
    - name: 'publish'
      content: '12/12/2024'
---

# SSR vs CSR and the Crawlers
in SSR everything renders in the server side
so the 
- Google can render CSR using a chromium for rendering the page when possible which is slow.
- It's way faster to do SSR
- Nuxt Universal Rendering
- Crawler can crawl you page by default
- Do not block page with authentication
- Do not use blocking meta tags, headers, or robots.txt
- ex: <meta name="robots" content="noindex">
- Ensure your page is working an returning 200 http response code
- Ensure your page is indexable (html, jpeg, webp, png, xml, mp4, wmw, avi)
- Also that it's not spammy ()
# How to help crawlers discover more of your pages?
## Optimize Links
- Search engines discover new pages via anchor tags
```
<NuxtLink :to="{ name: 'posts', params: { slug: 'the-vuejs-guide'}}">
  {{ post.title }}
</NuxtLink>
```
Which renders to:
```
<a href="/posts/the-vuejs-guide">
  The Vue.js Guide
</a>
```
- Avoid constructs that are not parsed by crawlers, like:
```
<div @click="nativateTo(...)">
  {{ post.title }}
</div
```
- Avoid linking important pages with Javascript and event listeners.
- Preferably, ALL pagination links should be present in the DOM. You can either 
make them **Fully Visible** or **Hidden with CSS**
- The linked text matters.
```
<NuxtLink to="/articles/vuejs-guide">click here</NuxtLink>
The one below helps crawlers know that the link is usefull. The one above doesn't.
<NuxtLink to="/articles/vuejs-guide">Vue.js Guide</NuxtLink>
```
- Use the Nuxt Link Checker to ensure all links are valid.
```
npx nuxi module add link-checker
```
## Use Sitemaps
- Nuxt Sitemap
```
npx nuxi module add @nuxtjs/sitemap
```
## Robots.txt
- Add a robots.txt file in the public/ directory to guide crawlers on which pages to index and which pages to ignore
```
User-agent: *
Disallow: /dashboard
```

- Nuxt robots manage robots crawling your site with minimal config
```
 npx nuxi module add robots
```
## Provide page Title
- using the useHead() composable
## Provide page Meta Tags
- useHead() composable
- useSeoMeta() composable
- SEO components (Title, Meta, Link, Head, ...etc)
```
useSeoMeta({
  title: 'Some title',
  ogTitle: 'Some title',
  description: 'Some description',
  ogDescription: 'Some description',
  ogImage: 'https://image url',
  twitterCard: 'summary large image',
})
```
- In the Nuxt dev tools the Open Graph tool shows you any missing important tags. And offers you a code snipet that can be copied and pasted in your code. 

- Nuxt SEO Utils (allows to define meta tags per route directly in your nuxt.config.ts file)
```
npx nuxi module add nuxt-seo-utils
```

## Canonicalization
- A web page url can have many variants which could be a problem
- Define canonical links with useHead per page:
```
const { slug } = useRoute().params;

useHead({
  link: [{ rel: "canonical", href: `...base-url.../${slug}`}],
})
```
- use the nuxt-seo-utils that also helps with auto-generate canonical links

## Redirections
- It's important for the crawler to land on the right page
```
// pages/posts/index.vue
await navigateTo('/articles', { redirectCode: 301 });
```
```
// middleware/redirect.ts
export default defineNuxtRouteMiddleware((to, from)=> {
  if (to.path === '/posts') {
    return navigateTo('/articles', { redirectCode: 301 });
  }
})
```
```
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    "/post": { 
      redirect: { to: "/articles", statusCode: 301 }
    },
  }
})
```
- Use the right redirection code (301: permanently moved) (302: temporarily moved)

## Structure Data Markup
- This helps google better understand your page's content and how it's structured.
- It's a < script > tag of a type JSON-LD (https://json-ld.org)
- It follows the https://schema.org schema and properties
- Check also for Microdata format
- Use Nuxt JSONLD module
```
npx nuxi module add nuxt-jsonld
```
```
useJsonld(() => ({
   '@context': "https://schema.org",
   '@type': 'Article',
   'name': `Gaming Article: ${article.title}`,
}))
```
- Use Nuxt Schema.org
```
npx nuxi module add schema-org
```
- look for NuxtSEO

## Page experience matter
- http/https
- mobile friendly?
- Interfering Ads?
- Valuable content?
- Core Web Vitals
https://pagespeed.web.dev/
https://web.dev/articles/vitals#core-web-vitals
https://developer.chrome.com/docs/crux/dashboard
https://cruxvis.withgoogle.com/#/

## Server-Side rendering
## Static Side regeneration
- Pre-render pages as static files when they don't need frequest updates
- Generate static pages for all discoverable link referenced on the homepage "/" 
```
npm nuxi generate
```
- Leverage the routeRules option in the nuxt.config file to enable selective pre-rendering.
```
export default defineNuxtConfig({
  routeRules: {
    "/rss.xml": { prerender: true }
  }
});
```
## Reduce JS bundle size
- Prefix heavy components with 'Lazy' to split into separate chunks from the final bundle.
```
<script setup>
  const show = ref(false);
</script>
<template>
  <LazyHeavyComponent v-if="show" />
  <LazyAnotherHeavyComponent v-else />
<template>
```
- Leverage dynamic imports with all dependencies that are:
* Not essencial for the initial page load
* Unlikety will be used by all users
```
const submitFeedback = (feedback) => {
  const sdk = await import ('big-sdk');
  await sdk.send(feedback);
}
```
## Optimize internal navigation
- Nuxt automatically prefetch links on visibility, which can help to reduce latency by prefetching resources before they're actually needed.
- If too many links are visible in the viewport during the initial page load, set the prefetch-on prop to 'interaction' instead.
```
<NuxtLink prefetch prefetch-on="interaction">About</NuxtLink>
```

## Preconnect and Preload hints
- Establish early connection with external domains.
```
useHead({
  link: [
    { 
      rel: 'preconnect',
      href: 'https://.......' 
    },
    { 
      rel: 'preload',
      type: 'font/woff2',
      href: '/fonts/font.woff2',
      as: 'font',
      crossorigin: ''
    },
  ]
})
```
## Reduce Unused CSS
- Enable Nuxt PurgeCSS module to remove unused CSS
- https://github.../Developmint/nuxt-purgecss

## Optimize Images
- Use NuxtImg
- Use webp format
- For below the fold images use loading="lazy", and placeholder option 
- For above the fold images use loading="eager", and preload option

## Use Nuxt Booster
- use this one with care (it helps to hack lighthouse scores)
```
npx nuxi module add nuxt-booster
```

