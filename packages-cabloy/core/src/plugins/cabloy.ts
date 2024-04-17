import { App } from 'vue';
import { CabloyApplication } from '../core/index.js';
import { PluginCabloyOptions } from '../types/interface/pluginCabloy.js';

export const PluginCabloy = {
  async install(vue: App, { modulesMeta, Monkey, locales, config, router }: PluginCabloyOptions) {
    // cabloy app
    const app = new CabloyApplication(vue);
    await app.initialize({ modulesMeta, Monkey, locales, config, router });
  },
};
