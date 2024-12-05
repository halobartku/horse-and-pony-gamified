/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a5568',
        secondary: '#718096',
        accent: '#f6ad55',
        background: '#1a1a1a',
        surface: '#2d2d2d',
        text: '#e5e7eb'
      },
    },
  },
  plugins: [],
}
