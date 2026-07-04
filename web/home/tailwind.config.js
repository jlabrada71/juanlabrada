/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg:                '#0b1326',
          'bg-dim':          '#060e20',
          surface:           '#171f33',
          'surface-high':    '#222a3d',
          'surface-highest': '#2d3449',
          primary:           '#00f0ff',
          'primary-dim':     '#00dbe9',
          'on-primary':      '#00363a',
          secondary:         '#14d1ff',
          tertiary:          '#65f2b5',
          text:              '#dae2fd',
          muted:             '#b9cacb',
          outline:           '#849495',
          'outline-subtle':  '#3b494b',
        },
      },
      fontFamily: {
        geist:     ['"Geist Variable"', 'system-ui', 'sans-serif'],
        hanken:    ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
      boxShadow: {
        'glow-primary':        '0 0 20px rgba(0, 240, 255, 0.25)',
        'glow-primary-strong': '0 0 40px rgba(0, 240, 255, 0.4)',
        'glow-tertiary':       '0 0 20px rgba(101, 242, 181, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
}
