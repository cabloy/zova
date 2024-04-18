import { App, markRaw } from 'vue';
import { BeanContainer, BeanContainerLike } from '../../bean/beanContainer.js';
import { AppMeta } from './meta.js';
import { PluginCabloyOptions } from '../../types/interface/pluginCabloy.js';
import { CabloyConfig, configDefault } from './config.js';
import { CabloyConstant, constantDefault } from './constant.js';
import { PluginBean } from '../../plugins/bean.js';
import { AppView } from '../component/view.js';
import { IModuleLocaleText } from '../../bean/resource/locale/type.js';

export class CabloyApplication {
  vue: App;
  bean: BeanContainerLike;
  meta: AppMeta;
  view: AppView;
  config: CabloyConfig;
  constant: CabloyConstant;
  $text: IModuleLocaleText;

  constructor(vue: App) {
    markRaw(this);
    vue.cabloy = this;
    this.vue = vue;
    this.bean = BeanContainer.create(this, null);
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    this.view = this.bean._newBeanSimple(AppView, false);
    this.$text = this.meta.locale.createLocaleText();
  }

  /** @internal */
  public async initialize({ modulesMeta, Monkey, locales, config, router }: PluginCabloyOptions) {
    // monkey
    await this.meta.initialize(Monkey);
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // router
    await this.view.initialize(router);
    // config
    this.config = this.meta.util.extend({}, configDefault, config);
    // constant
    this.constant = constantDefault;
    // plugins
    await this.handlePlugins();
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize');
  }

  private async handlePlugins() {
    // bean
    this.vue.use(PluginBean);
  }
}

declare module 'vue' {
  export interface App {
    /** @internal */
    cabloy: CabloyApplication;
  }
}
