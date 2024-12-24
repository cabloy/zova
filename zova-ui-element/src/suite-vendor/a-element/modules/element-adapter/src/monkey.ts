import { BeanSimple, IMonkeyAppInitialize } from 'zova';
import { LocalIcon } from './bean/local.icon.jsx';
import { ScopeModuleAStyle } from 'zova-module-a-style';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'element-adapter.themeHandler.default';
    // icon
    const localIcon = await this.bean._newBean(LocalIcon, false);
    await localIcon.initialize();
  }
}
