import { style } from 'typestyle';
import { BeanBase, BeanContainerLike, BeanSimple, IModule, IMonkeyModule, IMonkeySystem, SymbolModuleName } from 'zova';
import { ScopeModule } from './resource/this.js';

export class Monkey extends BeanSimple implements IMonkeySystem, IMonkeyModule {
  private _storeStyleDefault: any;
  private _moduleSelf: IModule;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async appInitialize() {}
  async appInitialized() {}
  async beanInit(bean: BeanContainerLike, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$style', {
      enumerable: false,
      configurable: true,
      get() {
        return function (props, ...args) {
          return self._patchStyle(beanInstance, props, ...args);
        };
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    if (this._moduleSelf !== module) return;
    const scope: ScopeModule = await this.bean.getScope(this._moduleSelf.info.relativeName);
    this._storeStyleDefault = await this.bean._newBean(scope.config.defaultStyle, true);
    console.log(this._storeStyleDefault);
  }
  async configLoaded(_module: IModule, _config) {}

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (props && typeof props === 'object') {
      props.$debugName = beanInstance[SymbolModuleName];
    }
    return style(props, ...args);
  }
}
