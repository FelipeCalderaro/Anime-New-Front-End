
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./app.{js,ts,vue}",
    "./error.{js,ts,vue}",
    "./app.config.{js,ts}",
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
        sans: ['Roboto', 'sans-serif']
      },
      scrollbar: {
        width: '12px',
      },
      colors: {
        'background': '#191c20',
        'headerBackground': 'rgba(21, 21, 21, 0.6)',
        'background55': 'rgba(10, 14, 25, 0.55)',
        'primary01': '#ff0048',
        'primary02': '#E00040',
        'primary03': '#E00040',
        'primary04': '#E00040',
        'primary05': '#B80034',
        'primary09': '#AD0132',
        'primary10': '#7E0829',
        'neutral01': '#C7C1CF',
        'neutral02': '#B9B2C3',
        'neutral03': '#A89DB7',
        'neutral04': '#998DAA',
        'neutral05': '#897D99',
        'neutral06': '#685D77',
        'neutral07': '#5B506B',
        'neutral08': '#514562',
        'neutral09': '#3D314C',
        'neutral10': '#302540',
        'bg': '#0A0E19',
        'fullWhite': '#FAFAFA',
        'redGradient': '#7E0829',
        'redGradient2': '#BE0909',
        'uiComponent': '#252a31',
        'uiComponent2': '#2A3547',
        'cardComponent': '#1f2226',
        'cardCountdownBg': "#1E1E22",
        'subtitle': '#dad9d8',
        'words': '#9eafc8',
        'labels': '#6c8091'
      }
    },
  },
  plugins: [],
}

