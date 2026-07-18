in development the .env keys are available through process.env.key. ex: MONGO_URL: process.env.MONGO_URL,
zsh keys have the highest precedence: export NUXT_PUBLIC_API_SERVER=http://pepito:3000; unset NUXT_PUBLIC_API_SERVER
.env keys have the second hightest precence: NUXT_PUBLIC_API_SERVER=http://localhost:4000
finally, nuxt.config.js keys have the last precedence

in production the keys in pm2 config file are available through process.env.key. ex: MONGO_URL: process.env.MONGO_URL,
nuxt.config.js 
{
  runtimeConfig: {
    keys only available in the server
    public: {
      keys available in both the client and the server
    }
}

in code the config keys are available through:
  const config = useRuntimeConfig()
  config.public.apiServer (for the public keys in the client)
  config.apiServer (for the private keys)