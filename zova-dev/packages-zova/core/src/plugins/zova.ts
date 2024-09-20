import { App } from 'vue';
import { ZovaApplication, ZovaContext } from '../core/index.js';
import { PluginZovaOptions } from '../types/interface/pluginZova.js';
import { BeanContainerInstances } from '../bean/beanContainer.js';
import { Cast } from '../types/index.js';
import { BeanControllerIdentifier, BeanRenderIdentifier, BeanStyleIdentifier } from '../bean/type.js';

export const PluginZova = {
  async install(
    vue: App,
    ctxRoot: ZovaContext,
    { modulesMeta, locales, config, AppMonkey, legacyRoutes }: PluginZovaOptions,
  ) {
    // zova app
    const app = new ZovaApplication(vue, ctxRoot);
    await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
    return app;
  },
  async update(app: ZovaApplication, ctxRoot: ZovaContext) {
    const bean = Cast(app.bean);
    bean.ctx = ctxRoot;
    for (const key in bean[BeanContainerInstances]) {
      bean[BeanContainerInstances][key].ctx = ctxRoot;
    }
    delete bean[BeanContainerInstances][BeanControllerIdentifier];
    delete bean[BeanContainerInstances][BeanRenderIdentifier];
    delete bean[BeanContainerInstances][BeanStyleIdentifier];
    Object.assign(bean[BeanContainerInstances], ctxRoot.bean[BeanContainerInstances]);
    ctxRoot.bean = bean;
    ctxRoot.app = app;
  },
};
