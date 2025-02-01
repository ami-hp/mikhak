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
        'mk-blue' : "#112c56",
      }
    },
  },
  plugins: [],
}

