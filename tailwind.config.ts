import { colors } from "quasar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `~/components/**/*.{vue,js,ts}`,
    `~/layouts/**/*.vue`,
    `~/pages/**/*.vue`,
    `~/composables/**/*.{js,ts}`,
    `~/plugins/**/*.{js,ts}`,
    `~/utils/**/*.{js,ts}`,
    `~/App.{js,ts,vue}`,
    `~/app.{js,ts,vue}`,
    `~/Error.{js,ts,vue}`,
    `~/error.{js,ts,vue}`,
    `~/app.config.{js,ts}`
  ],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo\\ 2', 'sans-serif'],
      },
      scrollbar: {
        width: '12px',
      },
    },
    colors: {
      'background': '#0a0e19',
      'primary-09': '#AD0132',
      'primary-10': '#7E0829',
      'neutral-01': '#C7C1CF',
      'neutral-02': '#B9B2C3',
      'neutral-03': '#A89DB7',
      'neutral-04': '#998DAA',
      'neutral-05': '#897D99',
      'neutral-06': '#685D77',
      'neutral-07': '#5B506B',
      'neutral-08': '#514562',
      'neutral-09': '#3D314C',
      'neutral-10': '#302540',
      'bg': '#0A0E19',
      'full-white': '#FAFAFA',
      'red-gradient': '#7E0829',
      'red-gradient2': '#BE0909',
      'ui-component': '#897D99',
      'ui-component2': '#2A3547',
      'card-component': '#1c2431',
      'card-countdown-bg': "#1E1E22"

    }
  },
  plugins: [],
}

