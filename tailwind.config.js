/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          yellow: 'hsl(56, 100%, 50%)'
        },
      },
      spacing: {
        'copyright-positioning' : '600px'
      }
    },
  },
  plugins: [],
}

