/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';

export default configure(_ctx => {
  return {
    build: {
      // extendViteConf(_viteConf) {},
      // viteVuePluginOptions: {},
    },

    devServer: {
      open: false, // opens browser window automatically
    },

    ssr: {},
  };
});
