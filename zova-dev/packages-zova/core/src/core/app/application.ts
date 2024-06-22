import { App, markRaw } from 'vue';
import { BeanContainer, BeanContainerLike } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import { ZovaConfig, configDefault } from './config.js';
import { ZovaConstant, constantDefault } from './constant.js';
import { PluginBean } from '../../plugins/bean.js';

export class ZovaApplication {
  vue: App;
  bean: BeanContainerLike;
  meta: AppMeta;
  config: ZovaConfig;
  constant: ZovaConstant;

  constructor(vue: App) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.bean = BeanContainer.create(this, null);
    this.meta = this.bean._newBeanSimple(AppMeta, false);
  }

  /** @internal */
  public async initialize({ modulesMeta, AppMonkey, locales, config }: PluginZovaOptions) {
    // monkey
    await this.meta.initialize(AppMonkey);
    // component
    await this.meta.component.initialize();
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // config
    this.config = this.meta.util.extend({}, configDefault, config);
    // constant
    this.constant = constantDefault;
    // plugins
    await this.handlePlugins();
    // module
    await this.meta.module.initialize(modulesMeta);
  }

  /** @internal */
  public async initialized({ bean }: { bean: BeanContainerLike }) {
    // module
    await this.meta.module.initialized();
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize', undefined, bean);
    // monkey: appInitialized
    await this.meta.module._monkeyModule('appInitialized', undefined, bean);
  }

  private async handlePlugins() {
    // bean
    this.vue.use(PluginBean);
  }
}

declare module 'vue' {
  export interface App {
    /** @internal */
    zova: ZovaApplication;
  }
}
