---
title: How to setup security policies for Nuxt 3
description: Nuxt have been modifying the way to setup security policies for end points to keep uptodate with the changes that the browsers are implementing.
createdAt: '07/4/2024'

slug: how-to-setup-security-policies-nuxt
tags: ['nuxt','security policies']
image:
  src: '/assets/image.jpg'
  alt: 'An image showcasing My Page.'
  width: 400
  height: 300
head:
  meta:
    - name: 'keywords'
      content: 'security policies nuxt'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Juan Labrada'
    - name: 'copyright'
      content: '© 2022 Juan Labrada'
    - name: 'publish'
      content: '07/04/2024'
---

# How to setup security policies for nuxt 3 endpoints


First step upgrade Nuxt
```
npx nuxi upgrade
```

Next let's install the Nuxt security module:
```
npx nuxi@latest module add security
```

Now update the nuxt config to include the security module:

```
export default defineNuxtConfig({
  modules: [..., "nuxt-security"],
  security: {
    // options
  }
})
```

# Define the global security configuration
https://nuxt-security.vercel.app/documentation/getting-started/setup


# Define the security configuration for an specific endpoint

Go tothe routeRules section in the nuxt config file. And configure the security for the intended route:

```

 routeRules: {
    ...
    // Add cors headers
    '/api/v1/**': { 
      security: {
        headers: {
          crossOriginResourcePolicy: 'cross-origin',
        },
        corsHandler: {
          origin: '*',
          methods: '*',
          allowHeaders: '*',
          exposeHeaders: '*'

        }
      }
    },
    ...
 }
```

You need to decide what are the best values for your specific use case.
More
https://nuxt-security.vercel.app/documentation/middleware/cors-handler

# Using with Nuxt DevTools

If you are using nuxt devtools, you need to modify the config accordingly

```
export default defineNuxtConfig({
  modules: [...'nuxt-security', '@nuxt/devtools'],
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
});
```