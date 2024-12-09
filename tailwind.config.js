/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../public/*.{html,js}",
    "../public/fonts/*.{ttf,woff,woff2,eot,svg,otf}",
    "../public/icons/*.{ico,png,svg,jpg,jpeg,gif,webp,avif}",
    "../public/images/*.{png,jpg,jpeg,gif,webp,avif}",
    "../*.{html,js}",
    "../src/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}