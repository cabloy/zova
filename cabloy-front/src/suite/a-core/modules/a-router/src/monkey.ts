import { BeanBase, BeanContainerLike, BeanSimple, IModule, IMonkeyModule, IMonkeySystem } from '@cabloy/front-core';
import { useRoute } from 'vue-router';
import { StoreRouterLike } from './bean/store.router.js';

export class Monkey extends BeanSimple implements IMonkeySystem, IMonkeyModule {
  private _storeRouter: StoreRouterLike;
  private _moduleSelf: IModule;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getStoreRouter() {
    if (!this._storeRouter) {
      this._storeRouter = (await this.bean._getBean('a-router.store.router', false)) as StoreRouterLike;
    }
    return this._storeRouter;
  }

  async appInitialize() {}
  async appInitialized() {
    // emit event
    const router = this.bean.inject('a-router:router');
    await this.app.meta.event.emit('a-router:routerGuards', router);
  }
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$router', {
      enumerable: false,
      configurable: true,
      get() {
        return bean.inject('a-router:router');
      },
    });
    bean.defineProperty(beanInstance, '$route', {
      enumerable: false,
      configurable: true,
      get() {
        return useRoute();
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const storeRouter = await this.getStoreRouter();
    storeRouter._registerRoutes(module);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
}
