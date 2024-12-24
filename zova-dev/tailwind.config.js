import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import themes from 'daisyui/src/theming/themes';

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
          ...themes.light,
          primary: '#f28238',
          'base-100': '#ffffff',
        },
      },
      {
        'orange-dark': {
          ...themes.dark,
          primary: '#f28238',
          'base-100': '#121212',
        },
      },
    ],
  },
};
