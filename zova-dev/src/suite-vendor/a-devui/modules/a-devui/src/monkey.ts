import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { ScopeModuleAStyle } from 'zova-module-a-style';
import { LocalSSR } from './bean/local.ssr.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-devui.tool.themeHandler';
    // ssr
    const localSSR = await this.bean._newBean(LocalSSR, false);
    await localSSR.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
