/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': { margin: '0rem' },
          '25%': { margin: '0.5rem' },
          '75%': { margin: '-0.5rem' },
          '100%': { margin: '0rem' },
        },
      },
      animation: {
        'shaking': 'shake 0.2s ease-in-out 0s 2',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
}

