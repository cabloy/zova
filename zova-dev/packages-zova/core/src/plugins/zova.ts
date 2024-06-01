import { App } from 'vue';
import { ZovaApplication } from '../core/index.js';
import { PluginZovaOptions } from '../types/interface/pluginZova.js';

export const PluginZova = {
  async install(vue: App, { modulesMeta, AppMonkey, locales, config }: PluginZovaOptions) {
    // zova app
    const app = new ZovaApplication(vue);
    await app.initialize({ modulesMeta, AppMonkey, locales, config });
  },
};
