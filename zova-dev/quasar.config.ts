/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';

export default configure(_ctx => {
  return {
    zovaManualChunk: {
      debug: false,
      vendors: [],
    },
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      // analyze: true,
      // minify: false,

      // extendViteConf(_viteConf) {},
      // viteVuePluginOptions: {},
    },

    devServer: {
      // https: true
      open: false, // opens browser window automatically
    },

    ssr: {
      middlewares: [
        'env', // keep this as first one
        'render', // keep this as last one
      ],
      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},
    },
  };
});
