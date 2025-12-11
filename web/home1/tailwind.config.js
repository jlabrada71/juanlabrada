/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const neonColors = (theme, name, type) => {
  const neonUtilities = {};
  const colors = theme('colors');
  for(const color in colors) {
    if(typeof colors[color] === 'object') {
      const color1 = colors[color]['500'];
      const color2 = colors[color]['700'];
      neonUtilities[`.${name}-${color}`] = {}
      neonUtilities[`.${name}-${color}`][type] =  `${color1} 1px 0 5px ,${color2} 0 0 20px `;
    }
  }
  return neonUtilities;
}

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  //  "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),

    plugin(({ theme, addUtilities }) => {
      const divNeonColors = neonColors(theme,'neon', 'boxShadow');
      const textNeonColors = neonColors(theme,'neon-text', 'textShadow');

      addUtilities(divNeonColors);
      addUtilities(textNeonColors);
    })
  ]
}
