/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{html,js,jsx,ts,tsx}', 'App.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#82E5B5',
      },
    },
  },
  plugins: [],
};
