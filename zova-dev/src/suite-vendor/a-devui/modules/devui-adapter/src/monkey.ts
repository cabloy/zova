import { BeanSimple, IMonkeyAppInitialize } from 'zova';
import { ScopeModuleAStyle } from 'zova-module-a-style';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'devui-adapter.themeHandler.default';
  }
}
