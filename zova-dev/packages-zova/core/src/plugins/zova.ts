import { App } from 'vue';
import { ZovaApplication, ZovaContext } from '../core/index.js';
import { PluginZovaOptions } from '../types/interface/pluginZova.js';
import { BeanContainerInstances, BeanContainerLike } from '../bean/beanContainer.js';
import { Cast } from '../types/index.js';
import { BeanControllerIdentifier, BeanRenderIdentifier, BeanStyleIdentifier } from '../bean/type.js';

export const PluginZova = {
  async install(vue: App, beanRoot: BeanContainerLike, { modulesMeta, AppMonkey, locales, config }: PluginZovaOptions) {
    // zova app
    const app = new ZovaApplication(vue, beanRoot);
    await app.initialize({ modulesMeta, AppMonkey, locales, config });
    return app;
  },
  async update(app: ZovaApplication, ctxRoot: ZovaContext) {
    const bean = Cast(app.bean);
    bean.ctx = ctxRoot;
    //
    bean[BeanContainerInstances][BeanControllerIdentifier] = ctxRoot.bean[BeanControllerIdentifier];
    bean[BeanContainerInstances][BeanRenderIdentifier] = ctxRoot.bean[BeanRenderIdentifier];
    bean[BeanContainerInstances][BeanStyleIdentifier] = ctxRoot.bean[BeanStyleIdentifier];
    //
    ctxRoot.bean = bean;
  },
};
