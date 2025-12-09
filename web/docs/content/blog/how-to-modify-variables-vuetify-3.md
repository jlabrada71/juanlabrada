---
title: How to modify variables in Vuetify 3
description: 
slug: how-to-modify-variables-vuetify-3
tags: ['vue', 'vuetify', 'programming', 'development']
---

# Hello Content

Create a custom theme definition and add a variables section

```
const myCustomLightTheme: ThemeDefinition = {
  variables: {
    'body-font-family': 'Poppins,sans-serif',
    'heading-font-family': 'Poppins, sans-serif',
    'line-height-root': 1.75,
    'font-size-root': '18px',
    'btn-border-radius': '12px',
  }
}
```
Then, add the theme to the Vuetify plugin definition:
```
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    blueprint: md2,
    ssr: true,    
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme,
      }
    }, 
    ...
```




