<template>
  <div class="bg-slate-700 w-full flex flex-col justify-around items-center">
    <slot />
  </div>
</template>

<script setup>
  import { onCLS, onFID, onLCP } from 'web-vitals'
  import { v4 as uuidv4 } from 'uuid'
  import { set, get } from '../lib/storage'
  import { debug, log } from '../lib/logger'
  import { watch } from 'vue'

  const config = useRuntimeConfig()

  let isAnalyticsLoaded = false

  function getUserId () {
    const userId = get('jl_userId')
    if (userId) {
      return userId
    }
    const newUserId = uuidv4()
    set('jl_userId', newUserId)
    return newUserId
  }

  function sendAnalytics (newRoute) {
    if (!process.client) return 
    const url = `${config.public.apiServer}/api/v1/analytics`
    const log = (data) => {
      const newData = { ...data }
      if (newData.name === 'CLS') {
        newData.entries = []
        if (data.entries) {
          for (const entry of data.entries) {
            delete entry.sources
          }
        }
      }
      window.jl.sendAnalytics(url, newData)
    }
    onCLS(log)
    onFID(log)
    onLCP(log)

    log({
      userId: getUserId(),
      url: window.location.href,
      route: newRoute
    })
  }

  useHead({
    script: [
      {
        src: `${config.public.apiServer}/analytics/analytics.js`,
        hid: 'analytics',
        type: 'module',
        async: true,
        defer: true,
          // on script load
        callback: () => {
          debug('Analytics Loaded')
          // set('jl_analytics', `${config.public.apiServer}/api/v1/analytics`)
          isAnalyticsLoaded = true
          sendAnalytics()
        }
      }
    ],
    htmlAttrs: {
      'lang': 'en'
    }
  })

  const route = useRoute()

  function sendAnalyticsWhenReady(newRoute) {
    if (isAnalyticsLoaded) {
      sendAnalytics(newRoute)
    } else {
      setTimeout(sendAnalyticsWhenReady, 1000, newRoute)
    }
  }

  watch(route, async (newRoute, oldRoute) => {
    sendAnalyticsWhenReady(newRoute)
  })
</script>

