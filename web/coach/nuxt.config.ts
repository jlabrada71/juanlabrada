// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available within server-side
    openAiCoachApiKey: '', // will be overwritten by .env NUXT_OPEN_AI_COACH_API_KEY
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api'
    }
  },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  routeRules: {
    '/blog/**': { swr: true },
    // Static page generated on-demand once
    '/articles/**': { static: true },
    // Static page generated on-demand, revalidates in background
    // Set custom headers matching paths
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
    // Render these routes with SPA
    '/admin/**': { ssr: false },
    // Add cors headers
    '/api/**': { cors: true },

  },
})