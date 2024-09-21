import { BeanBase, BeanContainer, BeanSimple, IMonkeyAppInitialize, IMonkeyBeanInit } from 'zova';
import { App } from 'ant-design-vue';
import { ScopeModuleAStyle } from 'zova-module-a-style';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyBeanInit {
  async appInitialize() {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await this.bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-antdv.tool.themeHandler';
  }
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$antdv', {
      enumerable: false,
      configurable: true,
      get() {
        return App.useApp();
      },
    });
  }
}
