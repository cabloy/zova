// Plugins
import Vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';

// Utilities
import { defineConfig, mergeConfig } from 'vite';
import { getFlavor } from '@cabloy/app-vite';
import { CabloyConfigMeta } from '@cabloy/front-core';
import { generateCabloyViteMeta } from '@cabloy/app-vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const flavor = getFlavor();
  const configMeta: CabloyConfigMeta = {
    flavor,
    mode,
    appMode: 'spa',
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
  const plugins = [Vue(), ElementPlus({})];
  for (const plugin of cabloyViteMeta.vitePlugins) {
    const pluginFn = plugin[1];
    const pluginOptions = plugin[2];
    plugins.push(pluginFn(pluginOptions));
  }
  // viteConfig
  const viteConfig = mergeConfig(cabloyViteMeta.viteConfig, {
    plugins,
    server: {
      port: 3000,
    },
  });
  return viteConfig;
});
