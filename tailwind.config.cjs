/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'whyte-inktrap': ['Whyte Inktrap', 'sans-serif'],
      },
      colors: {
        custom: {
          purple: { light: '#9059ff', dark: '#5a2bcc' },
          yellow: { light: '#ffe980', dark: '#fdba31' },
          pink: { light: '#ffdfe7', dark: '#ff4251' },
          green: { light: '#e3fff3', dark: '#07f49e' },
        },
      },
    },
  },

  plugins: [],
}
