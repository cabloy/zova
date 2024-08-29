/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default configure(_ctx => {
  return {
    build: {
      extendViteConf(viteConf) {
        // plugins
        viteConf.plugins = viteConf.plugins!.concat([
          // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
          <any>Vuetify({
            autoImport: false,
          }),
        ]);
      },
      viteVuePluginOptions: {
        template: { transformAssetUrls },
      },
    },

    devServer: {
      open: false, // opens browser window automatically
    },
  };
});
