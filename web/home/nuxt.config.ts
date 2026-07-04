// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography';


const variables = {
  development: {
    // apiBase: 'https://tryyourideas.com/api/v1',
    apiBase: 'http://localhost:3000',
    
  },
  production: {
    apiBase: 'https://juanlabrada.com',    
  }
}

const env = (process.env.NODE_ENV || 'development') as keyof typeof variables

export default defineNuxtConfig({
  alias: {
    "@/lib": "~/lib",
    "tiny-case":"tiny-case",
  },

  app: {
    head: {
      titleTemplate: '%s - Juan Labrada',
      title: 'Juan Labrada',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' }
      ]
    },
  },

  runtimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB: process.env.MONGO_DB,
    MAILER_PASS: process.env.MAILER_PASS,
    MAILER_ACCOUNT: 'agile@juanlabrada.com',
    HEART_BEAT: process.env.HEART_BEAT,
    ZIP_IMAGES: process.env.ZIP_IMAGES,
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      domain: 'juanlabrada.com',
      apiServer: variables[env].apiBase, // override by NUXT_PUBLIC_API_SERVER
      apiBase: process.env.API_BASE ,
      otherUrl: process.env.OTHER_URL,
      env: process.env.NODE_ENV
    }
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },

  modules: ['@vueuse/nuxt', "nuxt-security", '@nuxt/devtools'],

  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },

  components: {
    "dirs": [
      "~/components",
      "~/components/experiments",
      "~/components/daisyui",
      "~/components/validation"
    ]
  },

  routeRules: {
    // Set custom headers matching paths
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
    // Render these routes with SPA
    '/admin/**': { ssr: false },
    // Add cors headers
    '/api/v1/**': { 
      security: {
        headers: {
          crossOriginResourcePolicy: 'cross-origin',
        },
        corsHandler: {
          // options
          origin: '*',
          methods: '*',
          allowHeaders: '*',
          exposeHeaders: '*'
        }
      }
     },
    '/analytics/**': { cors: true, headers: { 'Content-Type': 'text/javascript' } },
    // Add redirect headers
    '/old-page': { redirect: '/new-page' },
    '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-07-04'
})