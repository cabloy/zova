import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { PatchIcon } from './patch/icon.js';
import useQuasar from 'quasar/src/composables/use-quasar/use-quasar.js';
import { ScopeModuleAStyle } from 'zova-module-a-style';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(bean: BeanContainer) {
    // defaultThemeHandler
    const scopeStyle: ScopeModuleAStyle = await bean.getScope('a-style');
    scopeStyle.config.defaultThemeHandler = 'a-quasar.tool.themeHandler';
    // icon
    const patchIcon = await bean._newBean(PatchIcon, false);
    await patchIcon.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async appReady(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$q', {
      enumerable: false,
      configurable: true,
      get() {
        return useQuasar();
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
