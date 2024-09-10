/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb( var(--color-background) / <alpha-value>)',
        foreground: 'rgb( var(--color-foreground) / <alpha-value>)',
        'foreground-faint':
          'rgb(var(--color-foreground-faint) / <alpha-value>)',
        ui: 'rgb(var(--color-ui) / <alpha-value>)',
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
        highlightextra: 'rgb(var(--color-highlightextra) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
