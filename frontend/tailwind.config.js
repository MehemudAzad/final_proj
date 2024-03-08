/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  // daisyui: {
  //   themes: [
  //     "forest",
  //   ],
  // },
  plugins: [require("daisyui")],
}

// const colors = require('tailwindcss/colors');

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         forest: {
//           DEFAULT: '#0b6623', // Replace with your desired forest color
//           // Add other shades if needed
//         },
//       },
//     },
//   },
//   plugins: [require('daisyui')],
// };