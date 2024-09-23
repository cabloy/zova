import { App, markRaw } from 'vue';
import { BeanContainer } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import { ZovaConfig, configDefault } from './config.js';
import { ZovaConstant, constantDefault } from './constant.js';
import { Cast } from '../../types/utils/cast.js';
import { ZovaContext } from '../context/context.js';
import { TypeModuleResourceConfig } from '../../types/interface/module.js';

export class ZovaApplication {
  private _reloadDelayTimer: number = 0;
  vue: App;
  bean: BeanContainer;
  meta: AppMeta;
  config: ZovaConfig;
  constant: ZovaConstant;
  ctx: ZovaContext;

  constructor(vue: App, ctxRoot: ZovaContext) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.ctx = ctxRoot;
    this.bean = ctxRoot.bean;
    Cast(this.bean).app = this;
    ctxRoot.app = this;
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    Cast(ctxRoot.instance.appContext).reload = () => {
      this.reloadDelay();
    };
  }

  /** @internal */
  public async initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes }: PluginZovaOptions) {
    // monkey
    await this.meta.initialize(AppMonkey, legacyRoutes);
    // component
    await this.meta.component.initialize();
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // config
    this.config = await this._combineConfig(config);
    // constant
    this.constant = constantDefault;
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize');
    // monkey: appInitialized
    await this.meta.module._monkeyModule('appInitialized');
    // monkey: appReady
    await this.meta.module._monkeyModule('appReady');
  }

  private async _combineConfig(config: TypeModuleResourceConfig[]): Promise<ZovaConfig> {
    const _config = this.meta.util.extend({}, configDefault());
    for (const configFn of config) {
      this.meta.util.extend(_config, await configFn(this, _config.meta));
    }
    return _config;
  }

  public reload() {
    window.location.reload();
  }

  public reloadDelay(cancel?: boolean) {
    if (cancel) {
      if (this._reloadDelayTimer !== 0) {
        window.clearTimeout(this._reloadDelayTimer);
        this._reloadDelayTimer = 0;
      }
    } else {
      this.reloadDelay(true);
      this._reloadDelayTimer = window.setTimeout(() => {
        this.reload();
      }, 100);
    }
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
