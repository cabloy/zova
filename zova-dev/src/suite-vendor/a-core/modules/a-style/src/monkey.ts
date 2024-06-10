import { style } from 'typestyle';
import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem, SymbolModuleName } from 'zova';

export class Monkey extends BeanSimple implements IMonkeySystem {
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

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (props && typeof props === 'object') {
      props.$debugName = beanInstance[SymbolModuleName];
    }
    return style(props, ...args);
  }
}
