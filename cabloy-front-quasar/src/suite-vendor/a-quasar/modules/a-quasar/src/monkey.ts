import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from '@cabloy/front-core';
import { PatchIcon } from './patch/icon.js';
import { useQuasar } from 'quasar';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize() {
    // icon
    const patchIcon = await this.bean._newBean(PatchIcon, false);
    await patchIcon.initialize();
  }
  async appInitialized() {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$q', {
      enumerable: false,
      configurable: true,
      get() {
        return useQuasar();
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
