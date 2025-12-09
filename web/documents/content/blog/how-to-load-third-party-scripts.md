---
title: How to Load Third-Party Scripts
description: undefined
slug: how-to-load-third-party-scripts
tags: ['nuxt','vue','web design']
---
# How to Load Third-Party Scripts

When loading third party scripts are two important things to consider:
- What needs to happen on SSR, should the script run on the server in addition to client?. 
- Some code needs to run only after the script finish loading

Loading third party scripts globally
-----------------------------------------------------------------
This setup runs the script on all pages both on server side and client side.

```
// nuxt.config.js
export default {
  head: {
    script: [
      { hid: 'myscript', src: 'https://myscript.url', defer: true }
    ]
  }
}
```

Set SSR parameter to false to run the script on client only:
(note this needs to be confirm, possibly is wrong)
plugins: [{ src: '~/plugins/vue-gallery.js', ssr: false }]

If you want to add a script tag before closing the </body> instead of <head> tag, you can do it by adding a body: true.

script: [
      {
        src: "script url",
        body: true,
      },
    ],

You can also add async, cross-origin attributes to a script tag like this.

script: [
      {
        src: "script url",
        async: true,
        crossorigin: "anonymous"
      },
    ],


Adding Third party scripts to selected pages
---------------------------------------------------------------------
This setup solves the issues of running the script in certain pages,  in addition to that it allows to execute code that depends on the third party script only after the script is loaded.
```
// /pages/some-page.vue
<template>
<SomeComponentDependingOnScript v-if="isScriptLoaded"/>
</template>
<script>
export default {
      data () {
        return {
          isScriptLoaded: false
        }
      },
      head () {
        return {
          title: 'Third Party script test',
          script: [
            {
              hid: 'script-id',
              src: 'script-url',
              defer: true,
              // on script load
              callback: () => { this.isScriptLoaded = true } 
            }
          ]
        }
      }
    }
</script>
```
Dynamically Loading Scripts in mounted()
-------------------------------------------------------------------------
This is an example posted by a user on the Nuxt issue board for dynamically loading a script. The key takeaway is checking the process.server value. By using 'defer' is generally a replacement for putting scripts in the body and remaining non-blocking.
```
export default {
  mounted() {
   // check the script is running in the client 
    if(process.server) return;
   // and that has not run before
    if (!window.<script defined variable>)
      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      script.src = "script url";
      document.head.appendChild(script);
    } else {
      this.onScriptLoaded();
    }
  },
  methods: {
    onScriptLoaded(event = null) {
      if (event) {
        console.log("Was added");
      } else {
        console.log("Already existed");
      }
      ... your code goes here...
    }
  }
}
```
Additional details can be found in:
=================================
[VueMeta Documentation](https://vue-meta.nuxtjs.org/)



  