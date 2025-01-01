/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['IRANYekan', 'sans-serif'],
      },
      colors: {
        'uu' : "#aa00aa",
      }
    },
  },
  plugins: [],
}

