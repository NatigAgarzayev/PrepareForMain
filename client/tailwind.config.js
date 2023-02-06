/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        '0': '0 0 40px',
        '1': '0 0 150px',
      }
    },
  },
  plugins: [],
}
