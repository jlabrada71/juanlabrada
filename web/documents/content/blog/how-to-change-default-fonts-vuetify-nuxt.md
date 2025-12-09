---
title: How to change default fonts in Vuetify and NuxtJS
description: Vuetify.js is best VueJS Material Design component framework implementation. It can be easily customized allowing to change all theme options like color, spacing, fonts and layouts. You can do this by changing it’s internal variables that control how the CSS code is generated. 
slug: how-to-change-default-fonts-vuetify-nuxt
tags: ['vue', 'vuetify', 'nuxt', 'design', 'font']
---

# How to change default fonts in Vuetify and NuxtJS

First of all, you need to tell Nuxt to include the fonts you want to use. One way to do this is by adding a stylesheet link to your nuxt.config.js file. Add the link to the head section. Everything you add to the head will be included in the final html page head.
```
head: {
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald|Libre+Baskerville&display=swap' }
  ]
},
```

Next, you need to enable treeshaking in the vuetify section, as mentioned in the Nuxt.js module documentation. Also make sure that the customVariables property is set (it should be added automatically by create-nuxt-app script):

This page corresponds to the `/` route of your website. You can delete it or create another file in the `content/` directory.

Try to navigate to [/about](/blog/about). These 2 pages are rendered by the `pages/[...slug].vue` component.

```js
const personName = personObject?.name
```


