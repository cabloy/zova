import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { App } from 'ant-design-vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainer) {}
  async appInitialized(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$antdv', {
      enumerable: false,
      configurable: true,
      get() {
        return App.useApp();
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
