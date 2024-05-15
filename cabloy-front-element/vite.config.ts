// Plugins
import Vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import path from 'path';

import Unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

// Utilities
import { defineConfig, mergeConfig } from 'vite';
import { getAppMode, getFlavor } from '@cabloy/app-vite';
import { CabloyConfigMeta } from '@cabloy/front';
import { generateCabloyViteMeta } from '@cabloy/app-vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const flavor = getFlavor();
  const appMode = getAppMode();
  const configMeta: CabloyConfigMeta = {
    flavor,
    mode,
    appMode,
  };
  const configOptions = {
    appDir: process.cwd(),
    runtimeDir: '.cabloy',
    cabloyManualChunk: {
      debug: false,
      vendors: [{ match: ['element-plus'], output: 'element-plus' }],
    },
  };
  // cabloyViteMeta
  const cabloyViteMeta = await generateCabloyViteMeta(configMeta, configOptions);
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
  for (const plugin of cabloyViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }

  const pathSrc = path.resolve(__dirname, 'src');

  // viteConfig
  const viteConfig = mergeConfig(cabloyViteMeta.viteConfig, {
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
    server: {
      port: 3000,
    },
  });
  return viteConfig;
});
