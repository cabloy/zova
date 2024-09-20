import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalIcon } from './bean/local.icon.js';
import { ScopeModuleAStyle } from 'zova-module-a-style';
import { LocalSSR } from './bean/local.ssr.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-quasar.tool.themeHandler';
    // icon
    const localIcon = await this.bean._newBean(LocalIcon, false);
    await localIcon.initialize();
    // ssr
    const localSSR = await this.bean._newBean(LocalSSR, false);
    await localSSR.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$q', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.vue.config.globalProperties.$q;
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
