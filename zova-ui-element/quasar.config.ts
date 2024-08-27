/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import ElementPlus from 'unplugin-element-plus/vite';
import path from 'path';

import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

import { configure } from 'quasar/wrappers';

export default configure(_ctx => {
  return {
    build: {
      extendViteConf(viteConf) {
        //viteConf.
      },
      // viteVuePluginOptions: {},
    },

    devServer: {
      open: false, // opens browser window automatically
    },
  };
});
