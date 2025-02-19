import { APP_CONFIGS } from "./constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  vite: {
    // Add custom Vite plugins, configure build options, etc.
    build: {
      // Increase memory limit if needed for large builds
      chunkSizeWarningLimit: 1000, // Adjust as necessary
    },
    server: {
      hmr: { overlay: false }, // Example: disable HMR overlay
    }
  },
  ssr: true,
  nitro: {
    preset: 'node-server', // Related to this https://github.com/nitrojs/nitro/issues/1484
    externals: {
      inline: ['vue', '@vue/server-renderer']
    }
  },
  app: {
    baseURL: "/temporadas/",
    buildAssetsDir: "/_nuxt/",
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
    'nuxt-simple-robots',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'pt-br', name: 'Portuguese', language: 'pt-BR', file: 'pt-br.json' },
      // { code: 'pt-pt', name: 'Portuguese (Portugal)', iso: 'pt-PT', file: 'pt-pt.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      // { code: 'it', name: 'Italian', iso: 'it-IT', file: 'it.json' },
      // { code: 'es', name: 'Spanish', iso: 'es-ES', file: 'es.json' },
      // { code: 'bg', name: 'Bulgarian', iso: 'bg-BG', file: 'bg.json' },
      // { code: 'cs', name: 'Czech', iso: 'cs-CZ', file: 'cs.json' },
      // { code: 'da', name: 'Danish', iso: 'da-DK', file: 'da.json' },
      // { code: 'de', name: 'German', iso: 'de', file: 'de.json' },
      // { code: 'el', name: 'Greek', iso: 'el-GR', file: 'el.json' },
      // { code: 'et', name: 'Estonian', iso: 'et-EE', file: 'et.json' },
      // { code: 'fi', name: 'Finnish', iso: 'fi-FI', file: 'fi.json' },
      // { code: 'fr', name: 'French', iso: 'fr', file: 'fr.json' },
      // { code: 'hu', name: 'Hungarian', iso: 'hu-HU', file: 'hu.json' },
      // { code: 'id', name: 'Indonesian', iso: 'id-ID', file: 'id.json' },
      // { code: 'ja', name: 'Japanese', iso: 'ja-JP', file: 'ja.json' },
      // { code: 'ko', name: 'Korean', iso: 'ko-KR', file: 'ko.json' },
      // { code: 'lt', name: 'Lithuanian', iso: 'lt-LT', file: 'lt.json' },
      // { code: 'lv', name: 'Latvian', iso: 'lv-LV', file: 'lv.json' },
      // { code: 'nb', name: 'Norwegian Bokmål', iso: 'nb-NO', file: 'nb.json' },
      // { code: 'nl', name: 'Dutch', iso: 'nl-NL', file: 'nl.json' },
      // { code: 'pl', name: 'Polish', iso: 'pl-PL', file: 'pl.json' },
      // { code: 'ro', name: 'Romanian', iso: 'ro-RO', file: 'ro.json' },
      // { code: 'ru', name: 'Russian', iso: 'ru-RU', file: 'ru.json' },
      // { code: 'sk', name: 'Slovak', iso: 'sk-SK', file: 'sk.json' },
      // { code: 'sl', name: 'Slovenian', iso: 'sl-SI', file: 'sl.json' },
      // { code: 'sv', name: 'Swedish', iso: 'sv-SE', file: 'sv.json' },
      // { code: 'tr', name: 'Turkish', iso: 'tr-TR', file: 'tr.json' },
      // { code: 'uk', name: 'Ukrainian', iso: 'uk-UA', file: 'uk.json' },
      // { code: 'zh', name: 'Chinese', iso: 'zh-CN', file: 'zh.json' },
    ],
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: 'pt-br',
    // debug: process.env.NUXT_ENVIRONMENT !== 'production'
  },
  robots: {
    enabled: process.env.NUXT_ENVIRONMENT === 'production',
  },
  sitemap: {
    enabled: process.env.NUXT_ENVIRONMENT === 'production',
  },
  runtimeConfig: {
    public: {
      GQL_HOST: APP_CONFIGS.externalGql, // overwritten by process.env.GQL_HOST
      strapi: {
        devtools: true,
      },
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://animenew.com.br',
      siteName: APP_CONFIGS.title,
      language: 'pt-BR',
    },
    strapi: {
      devtools: true
    }
  },

})