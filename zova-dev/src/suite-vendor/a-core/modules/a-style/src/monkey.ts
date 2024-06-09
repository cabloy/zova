import { style } from 'typestyle';
import { BeanBase, BeanContainerLike, BeanSimple, IMonkeySystem, SymbolBeanFullName, appResource } from 'zova';

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
      const beanFullName = beanInstance[SymbolBeanFullName];
      const beanOptions = appResource.getBean(beanFullName);
      const module = beanOptions?.module;
      props.$debugName = module;
    }
    return style(props, ...args);
  }
}
