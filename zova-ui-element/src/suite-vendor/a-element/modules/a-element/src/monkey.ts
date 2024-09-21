import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { LocalIcon } from './bean/local.icon.jsx';
import { ScopeModuleAStyle } from 'zova-module-a-style';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-element.tool.themeHandler';
    // icon
    const localIcon = await this.bean._newBean(LocalIcon, false);
    await localIcon.initialize();
  }
  async appInitialized() {}
  async appReady() {}
  async beanInit(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
