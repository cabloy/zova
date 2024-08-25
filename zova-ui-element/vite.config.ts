// Plugins
import Vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import path from 'path';

import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

// Utilities
import { defineConfig, mergeConfig } from 'vite';
import { getAppMode, getFlavor } from 'zova-vite';
import { ZovaConfigMeta } from 'zova';
import { generateZovaViteMeta } from 'zova-vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const flavor = getFlavor();
  const appMode = getAppMode();
  const configMeta: ZovaConfigMeta = {
    flavor,
    mode,
    appMode,
  };
  const configOptions = {
    appDir: process.cwd(),
    runtimeDir: '.zova',
    zovaManualChunk: {
      debug: false,
    },
  };
  // zovaViteMeta
  const zovaViteMeta = await generateZovaViteMeta(configMeta, configOptions);
  // plugins
  const plugins = [
    Vue(),
    ElementPlus({}), // https://github.com/antfu/unocss
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
  ];
  for (const plugin of zovaViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }

  const pathSrc = path.resolve(__dirname, 'src');

  // viteConfig
  const viteConfig = mergeConfig(zovaViteMeta.viteConfig, {
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/css/element/index.scss" as *;',
        },
      },
    },
    plugins,
    build: {
      // minify: false,
    },
  });
  return viteConfig;
});
