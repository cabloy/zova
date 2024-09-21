/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import ElementPlus from 'unplugin-element-plus/vite';
import path from 'path';

import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

import { configure } from 'quasar/wrappers';
import { mergeConfig } from 'vite';

export default configure(_ctx => {
  return {
    build: {
      extendViteConf(viteConf) {
        // plugins
        viteConf.plugins = viteConf.plugins!.concat([
          ElementPlus({ useSource: false }), // https://github.com/antfu/unocss
          // see unocss.config.ts for config
          (<any>Unocss)({
            presets: [
              presetUno(),
              presetAttributify(),
              presetIcons({
                scale: 1.2,
                warn: true,
              }),
            ],
            transformers: [transformerDirectives(), transformerVariantGroup()],
          }),
        ]);
        // resolve
        const pathSrc = path.resolve(__dirname, 'src');
        viteConf.resolve = mergeConfig(viteConf.resolve || {}, {
          alias: {
            '~/': `${pathSrc}/`,
          },
        });
        // css
        viteConf.css = mergeConfig(viteConf.css || {}, {
          preprocessorOptions: {
            scss: {
              additionalData: '@use "~/css/element/index.scss" as *;',
            },
          },
        });
      },
      // viteVuePluginOptions: {},
    },

    devServer: {
      open: false, // opens browser window automatically
    },
  };
});
