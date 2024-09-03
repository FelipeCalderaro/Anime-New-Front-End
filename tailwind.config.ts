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
      screens: {
        // Default Tailwind breakpoints are here by default
        // Basically means, beyond this breakpoint use 
        // something else until it hits the next checkpoint
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Custom breakpoints
        'fhd': '1805px',    // Full HD (1080p)
        'qhd': '2304px',    // Quad HD (1440p)
        'uhd': '2880px',    // Ultra HD (4K, based on 2880px width)
        '4k': '3456px',     // 4K (DCI, based on 3456px width)
        '5k': '4224px',     // 5K resolution
        '6k': '5120px',     // 6K resolution
        '8k': '6144px',     // 8K resolution
        // Using max instead of the default [minimun]
        'max-sm': { 'max': '640px' },
        'max-md': { 'max': '768px' },
        'max-lg': { 'max': '1024px' },
        'max-xl': { 'max': '1280px' },
        'max-2xl': { 'max': '1536px' },
        // Custom breakpoints
        'max-fhd': { 'max': '1805px' },    // Full HD (1080p)
        'max-qhd': { 'max': '2304px' },    // Quad HD (1440p)
        'max-uhd': { 'max': '2880px' },    // Ultra HD (4K, based on 2880px width)
        'max-4k': { 'max': '3456px' },     // 4K (DCI, based on 3456px width)
        'max-5k': { 'max': '4224px' },     // 5K resolution
        'max-6k': { 'max': '5120px' },     // 6K resolution
        'max-8k': { 'max': '6144px' },     // 8K resolution
      },
      fontFamily: {
        exo: ['Exo\\ 2', 'sans-serif'],
      },
      scrollbar: {
        width: '12px',
      },
      colors: {
        'background': '#0a0e19',
        'background-55': 'rgba(10, 14, 25, 0.55)',
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
  },
  plugins: [],
}

