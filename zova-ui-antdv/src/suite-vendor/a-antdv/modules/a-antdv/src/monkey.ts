import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { App } from 'ant-design-vue';
import { ScopeModuleAStyle } from 'zova-module-a-style';
import { LocalSSR } from './bean/local.ssr.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  private _localSSR: LocalSSR;

  async appInitialize(bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-antdv.tool.themeHandler';
    // ssr
    this._localSSR = await bean._newBean(LocalSSR, false);
    await this._localSSR.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$antdv', {
      enumerable: false,
      configurable: true,
      get() {
        return App.useApp();
      },
    });
    bean.defineProperty(beanInstance, '$antdvStyleCache', {
      enumerable: false,
      configurable: true,
      get() {
        return self._localSSR.styleCache;
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
