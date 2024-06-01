// Plugins
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

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
      vendors: [{ match: ['vuetify'], output: 'vuetify' }],
    },
  };
  // zovaViteMeta
  const zovaViteMeta = await generateZovaViteMeta(configMeta, configOptions);
  // plugins
  const plugins = [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: false,
      styles: {
        configFile: 'src/css/settings.scss',
      },
    }),
  ];
  for (const plugin of zovaViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }
  // viteConfig
  const viteConfig = mergeConfig(zovaViteMeta.viteConfig, {
    plugins,
  });
  return viteConfig;
});
