import { BeanBase, BeanContainerLike, BeanSimple, IModule, IMonkeyModule, IMonkeySystem } from '@cabloy/front';
import { StoreComponent } from './bean/store.component.js';

export class Monkey extends BeanSimple implements IMonkeySystem, IMonkeyModule {
  private _storeComponent: StoreComponent;
  private _moduleSelf: IModule;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getStoreComponent() {
    if (!this._storeComponent) {
      this._storeComponent = await this.bean._getBean('a-component.store.component', false);
    }
    return this._storeComponent;
  }

  async appInitialize() {}
  async appInitialized() {}
  async beanInit(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const storeComponent = await this.getStoreComponent();
    storeComponent._registerComponents(module);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
}
