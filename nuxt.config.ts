// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "nuxt-graphql-client"],
  runtimeConfig: {
    public: {
      GQL_HOST: 'https://graphql.anilist.co' // overwritten by process.env.GQL_HOST
    }
  }
})