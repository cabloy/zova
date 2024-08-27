import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalIcon } from './bean/local.icon.jsx';
import { ScopeModuleAStyle } from 'zova-module-a-style';
import { LocalSSR } from './bean/local.ssr.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  private _localSSR: LocalSSR;

  async appInitialize(bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-element.tool.themeHandler';
    // icon
    const localIcon = await bean._newBean(LocalIcon, false);
    await localIcon.initialize();
    // ssr
    this._localSSR = await bean._newBean(LocalSSR, false);
    await this._localSSR.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
