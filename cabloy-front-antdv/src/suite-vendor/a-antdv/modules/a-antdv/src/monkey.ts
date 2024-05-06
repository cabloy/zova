import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem, renderIcon } from '@cabloy/front';
import { App } from 'ant-design-vue';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {}
  async appInitialized() {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$antdv', {
      enumerable: false,
      configurable: true,
      get() {
        return App.useApp();
      },
    });
    bean.defineProperty(beanInstance, '$iconh', {
      enumerable: false,
      configurable: true,
      get() {
        return renderIcon;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
