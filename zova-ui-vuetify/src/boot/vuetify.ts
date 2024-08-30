/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
let theme;
if (process.env.CLIENT && process.env.SSR) {
  const state = (<any>window).__INITIAL_STATE__;
  const dark = (<any>window).ssr_themedark;
  theme = {
    defaultTheme: state['data-ssr-theme-name'],
    themes: {
      [state['data-ssr-theme-name']]: state[`data-ssr-theme-token-${dark}`],
    },
  };
} else {
  theme = {
    defaultTheme: 'dark',
  };
}
export default createVuetify({
  ssr: process.env.SSR,
  theme,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
