import { style } from 'typestyle';
import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem, SymbolModuleName, useComputed } from 'zova';
import { ScopeModule, __ThisModule__ } from './resource/this.js';
import { StoreTheme } from './bean/store.theme.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  private _storeTheme: StoreTheme;
  private _storeStyleDefault: any;

  async appInitialize(bean: BeanContainerLike) {
    // theme
    this._storeTheme = await bean._getBean(StoreTheme, true);
    // style default
    const scope: ScopeModule = await bean.getScope(__ThisModule__);
    this._storeStyleDefault = await bean._getBean(scope.config.defaultStyle, true);
  }
  async appInitialized(_bean: BeanContainerLike) {}
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
        return self._storeStyleDefault;
      },
    });
    bean.defineProperty(beanInstance, '$theme', {
      enumerable: false,
      configurable: true,
      get() {
        return self._storeTheme;
      },
    });
    bean.defineProperty(beanInstance, '$token', {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => self._storeTheme.token);
      },
    });
  }
  async beanInited(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainerLike, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainerLike, _beanInstance: BeanBase) {}

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (props && typeof props === 'object') {
      props = Object.assign({ $debugName: beanInstance[SymbolModuleName] }, props);
    }
    return style(props, ...args);
  }
}
