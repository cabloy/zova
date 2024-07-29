import { App, markRaw } from 'vue';
import { BeanContainer } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import { ZovaConfig, configDefault } from './config.js';
import { ZovaConstant, constantDefault } from './constant.js';
import { Cast } from '../../types/utils/cast.js';
import { ZovaContext } from '../context/context.js';

export class ZovaApplication {
  private reloadDelayTimer: number = 0;
  vue: App;
  bean: BeanContainer;
  meta: AppMeta;
  config: ZovaConfig;
  constant: ZovaConstant;

  constructor(vue: App, ctxRoot: ZovaContext) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.bean = ctxRoot.bean;
    Cast(this.bean).app = this;
    ctxRoot.app = this;
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    Cast(ctxRoot.instance.appContext).reload = () => {
      this.reload(true);
    };
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

  public reload(delay?: boolean) {
    if (!delay) {
      window.location.reload();
      return;
    }
    this.reloadCancel();
    this.reloadDelayTimer = window.setTimeout(() => {
      this.reload();
    }, 100);
  }

  public reloadCancel() {
    if (this.reloadDelayTimer !== 0) {
      window.clearTimeout(this.reloadDelayTimer);
      this.reloadDelayTimer = 0;
    }
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
