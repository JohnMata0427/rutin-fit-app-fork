/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{html,js,jsx,ts,tsx}', 'App.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
