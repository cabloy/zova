import { App } from 'vue';
import { ZovaApplication } from '../core/index.js';
import { PluginZovaOptions } from '../types/interface/pluginZova.js';
import { BeanContainerLike } from '../bean/beanContainer.js';

export const PluginZova = {
  async install(vue: App, beanRoot: BeanContainerLike, { modulesMeta, AppMonkey, locales, config }: PluginZovaOptions) {
    // zova app
    const app = new ZovaApplication(vue, beanRoot);
    await app.initialize({ modulesMeta, AppMonkey, locales, config });
    return app;
  },
};
