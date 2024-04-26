import { App } from '@cabloy/vue-runtime-core';
import { CabloyApplication } from '../core/index.js';
import { PluginCabloyOptions } from '../types/interface/pluginCabloy.js';

export const PluginCabloy = {
  async install(vue: App, { modulesMeta, AppMonkey, locales, config }: PluginCabloyOptions) {
    // cabloy app
    const app = new CabloyApplication(vue);
    await app.initialize({ modulesMeta, AppMonkey, locales, config });
  },
};
