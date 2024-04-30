import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from '@cabloy/front-core';
import { PatchRouter } from './patch/router.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  patchRouter: PatchRouter;

  async appInitialize() {
    // router
    this.patchRouter = await this.bean._newBean(PatchRouter, false);
  }
  async appInitialized() {}

  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
