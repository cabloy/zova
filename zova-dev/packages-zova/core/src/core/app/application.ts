import { App, markRaw } from 'vue';
import { BeanContainerLike } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import { ZovaConfig, configDefault } from './config.js';
import { ZovaConstant, constantDefault } from './constant.js';
import { Cast } from '../../types/utils/cast.js';

export class ZovaApplication {
  vue: App;
  bean: BeanContainerLike;
  meta: AppMeta;
  config: ZovaConfig;
  constant: ZovaConstant;

  constructor(vue: App, beanRoot: BeanContainerLike) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.bean = beanRoot;
    Cast(this.bean).app = this;
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
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize', undefined, this.bean);
    // monkey: appInitialized
    await this.meta.module._monkeyModule('appInitialized', undefined, this.bean);
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
