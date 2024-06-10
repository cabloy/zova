import { style } from 'typestyle';
import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem, SymbolModuleName } from 'zova';
import { ScopeModule, __ThisModule__ } from './resource/this.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  private _storeStyleDefault: any;

  async appInitialize() {
    const scope: ScopeModule = await this.bean.getScope(__ThisModule__);
    this._storeStyleDefault = await this.bean._newBean(scope.config.defaultStyle, true);
    console.log(this._storeStyleDefault);
  }
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
    bean.defineProperty(beanInstance, '$class', {
      enumerable: false,
      configurable: true,
      get() {
        return this._storeStyleDefault;
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (props && typeof props === 'object') {
      props.$debugName = beanInstance[SymbolModuleName];
    }
    return style(props, ...args);
  }
}
