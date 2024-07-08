import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      'light',
      'dark',
      {
        'orange-light': {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#f28238',
          'base-100': '#ffffff',
        },
      },
      {
        'orange-dark': {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#f28238',
          'base-100': '#121212',
        },
      },
    ],
  },
};
