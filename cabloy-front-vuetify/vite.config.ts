// Plugins
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

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
      vendors: [{ match: ['vuetify'], output: 'vuetify' }],
    },
  };
  // cabloyViteMeta
  const cabloyViteMeta = await generateCabloyViteMeta(configMeta, configOptions);
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
  for (const plugin of cabloyViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }
  // viteConfig
  const viteConfig = mergeConfig(cabloyViteMeta.viteConfig, {
    plugins,
  });
  return viteConfig;
});
