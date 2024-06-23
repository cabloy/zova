import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem } from 'zova';
import { PatchIcon } from './patch/icon.jsx';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainerLike) {
    // icon
    const patchIcon = await this.bean._newBean(PatchIcon, false);
    await patchIcon.initialize();
  }
  async appInitialized(_bean: BeanContainerLike) {}
  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
}
