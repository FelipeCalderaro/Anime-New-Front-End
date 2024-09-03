import { APP_CONFIGS } from "./constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    externals: {
      inline: ['vue', '@vue/server-renderer']
    }
  },
  app: {
    head: {
      title: APP_CONFIGS.title,
      meta: [
        {
          name: "description",
          content: APP_CONFIGS.description
        },
        {
          name: 'google-site-verification',
          content: APP_CONFIGS.googleSiteVerification,
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
          content: APP_CONFIGS.googleAdsensePlatformAccount
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
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: APP_CONFIGS.externalGql, // overwritten by process.env.GQL_HOST
      strapi: {
        devtools: true,
      },
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://animenew.com.br',
      siteName: "AnimeNew - Noticias de Anime e Mangá, Games, Light Novels e Mais",
      language: 'pt-BR',
    },
    strapi: {
      devtools: true
    }
  }
})