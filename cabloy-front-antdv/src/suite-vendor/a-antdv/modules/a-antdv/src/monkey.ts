import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from '@cabloy/front-core';
import { App } from 'ant-design-vue';
import { renderIcon } from './patch/icon.js';

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
    bean.defineProperty(beanInstance, '$icon', {
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
