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
    baseURL: '/api/',
    preset: 'node-server', // Related to this https://github.com/nitrojs/nitro/issues/1484
    externals: {
      inline: ['vue', '@vue/server-renderer']
    }
  },
  build: {
    transpile: [
      'deepl-node',
      'axios',
    ],
  },
  app: {
    baseURL: "/temporadas/",
    buildAssetsDir: "/_nuxt/",
    head: {
      title: APP_CONFIGS.title,
      titleTemplate: "%s",
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
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  modules: [
    '@nuxtjs/google-adsense',
    "nuxt-quasar-ui",
    "nuxt-graphql-client",
    "@nuxtjs/strapi",
    "@nuxtjs/tailwindcss",
    // '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],
  googleAdsense: {
    onPageLoad: false,
    pageLevelAds: false,
  },
  i18n: {
    locales: [
      { code: 'pt-br', name: 'Portuguese', language: 'pt-BR', file: 'pt-br.json' },
      { code: 'ja', name: 'Japanese', language: 'ja-JP', file: 'ja.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Spanish', language: 'es-ES', file: 'es.json' },
      // { code: 'pt-pt', name: 'Portuguese (Portugal)', language: 'pt-PT', file: 'pt-pt.json' },
      // { code: 'it', name: 'Italian', language: 'it-IT', file: 'it.json' },
      // { code: 'bg', name: 'Bulgarian', language: 'bg-BG', file: 'bg.json' },
      // { code: 'cs', name: 'Czech', language: 'cs-CZ', file: 'cs.json' },
      // { code: 'da', name: 'Danish', language: 'da-DK', file: 'da.json' },
      // { code: 'de', name: 'German', language: 'de', file: 'de.json' },
      // { code: 'el', name: 'Greek', language: 'el-GR', file: 'el.json' },
      // { code: 'et', name: 'Estonian', language: 'et-EE', file: 'et.json' },
      // { code: 'fi', name: 'Finnish', language: 'fi-FI', file: 'fi.json' },
      // { code: 'fr', name: 'French', language: 'fr', file: 'fr.json' },
      // { code: 'hu', name: 'Hungarian', language: 'hu-HU', file: 'hu.json' },
      // { code: 'id', name: 'Indonesian', language: 'id-ID', file: 'id.json' },
      // { code: 'ko', name: 'Korean', language: 'ko-KR', file: 'ko.json' },
      // { code: 'lt', name: 'Lithuanian', language: 'lt-LT', file: 'lt.json' },
      // { code: 'lv', name: 'Latvian', language: 'lv-LV', file: 'lv.json' },
      // { code: 'nb', name: 'Norwegian Bokmål', language: 'nb-NO', file: 'nb.json' },
      // { code: 'nl', name: 'Dutch', language: 'nl-NL', file: 'nl.json' },
      // { code: 'pl', name: 'Polish', language: 'pl-PL', file: 'pl.json' },
      // { code: 'ro', name: 'Romanian', language: 'ro-RO', file: 'ro.json' },
      // { code: 'ru', name: 'Russian', language: 'ru-RU', file: 'ru.json' },
      // { code: 'sk', name: 'Slovak', language: 'sk-SK', file: 'sk.json' },
      // { code: 'sl', name: 'Slovenian', language: 'sl-SI', file: 'sl.json' },
      // { code: 'sv', name: 'Swedish', language: 'sv-SE', file: 'sv.json' },
      // { code: 'tr', name: 'Turkish', language: 'tr-TR', file: 'tr.json' },
      // { code: 'uk', name: 'Ukrainian', language: 'uk-UA', file: 'uk.json' },
      // { code: 'zh', name: 'Chinese', language: 'zh-CN', file: 'zh.json' },
    ],
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: 'pt-br',
    // debug: process.env.NUXT_ENVIRONMENT !== 'production'
  },
  robots: {
    enabled: false, //process.env.NUXT_ENVIRONMENT === 'production',
    robotsTxt: false
  },
  sitemap: {
    enabled: true, //process.env.NUXT_ENVIRONMENT === 'production',
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
      googleAdsense: {
        id: process.env.GOOGLE_ADSENSE_ID || "ca-pub-3926999916166130",
        test: process.env.GOOGLE_ADSENSE_TEST_MODE === 'true' || true,
      },
    },
    strapi: {
      devtools: false
    }
  },

})