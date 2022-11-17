/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'crayola-blue': '#3578e5',
      'flickr-blue': '#1b62d4',
      'sapphire-blue': '#1751af',
      'dark-cornflower-blue': '#123f89',
      'oxford-blue': '#0c1d36',
    },
  },
  plugins: [],
})
