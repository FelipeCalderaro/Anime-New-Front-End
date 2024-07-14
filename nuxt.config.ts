// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "AnimeNew - Noticias de Anime e Mangá, Games, Light Novels e Mais",
      meta: [
        {
          name: "description",
          content: "As últimas notícias do universo de animes e mangá. bem-vindo ao AnimeNew, seu destino definitivo de notícias sobre o que assistir de anime."
        },
        {
          name: 'google-site-verification',
          content: "XIaB1el2AJjHC60LMud2pAxV2P6M0Ur3_eDBxXxgOII",
        },
        {
          name: 'twitter:card',
          content: "summary_large_image"
        },
        {
          name: 'twitter:site',
          content: '@animenew_'
        },
        {
          name: "google-adsense-platform-account",
          content: "ca-host-pub-2644536267352236"
        },
        {
          name: "google-adsense-platform-domain",
          content: "sitekit.withgoogle.com",
        },
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  modules: [
    "nuxt-quasar-ui",
    "nuxt-graphql-client",
    "@nuxtjs/strapi",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-config-typescript",
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: 'https://graphql.anilist.co', // overwritten by process.env.GQL_HOST
      strapi: {
        devtools: true,
      }
    },
    strapi: {
      devtools: true
    }
  }
})