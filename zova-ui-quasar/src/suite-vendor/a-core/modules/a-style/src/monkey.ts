import { style, createTypeStyle, TypeStyle } from 'typestyle';
import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem, SymbolModuleName, useComputed } from 'zova';
import { ScopeModule, __ThisModule__ } from './resource/this.js';
import { BeanTheme } from './bean/bean.theme.js';

export class Monkey extends BeanSimple implements IMonkeySystem {
  private _beanTheme: BeanTheme;
  private _beanStyleDefault: any;
  private _styleInstance: TypeStyle;

  async appInitialize(_bean: BeanContainer) {
    if (process.env.SERVER) {
      this._styleInstance = createTypeStyle();
      this.ctx.meta.ssr.context.onRendered(() => {
        const styles = this._styleInstance.getStyles();
        this.ctx.meta.ssr.context._meta.headTags += `<style id="styles-target">${styles}</style>`;
      });
    }
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      this._styleInstance = createTypeStyle();
      this.ctx.meta.ssr.onHydrated(() => {
        this._styleInstance.setStylesTarget(document.getElementById('styles-target')!);
      });
    }
  }
  async appInitialized(bean: BeanContainer) {
    // theme
    this._beanTheme = await bean._getBean(BeanTheme, true);
    // style default
    const scope: ScopeModule = await bean.getScope(__ThisModule__);
    this._beanStyleDefault = await bean._getBean(scope.config.defaultStyle, true);
  }
  async appReady(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
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
        return self._beanStyleDefault;
      },
    });
    bean.defineProperty(beanInstance, '$theme', {
      enumerable: false,
      configurable: true,
      get() {
        return self._beanTheme;
      },
    });
    bean.defineProperty(beanInstance, '$token', {
      enumerable: false,
      configurable: true,
      get() {
        return useComputed(() => self._beanTheme.token);
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}

  _patchStyle(beanInstance: BeanBase, props, ...args) {
    if (props && typeof props === 'object') {
      props = Object.assign({ $debugName: beanInstance[SymbolModuleName] }, props);
    }
    if (this._styleInstance) {
      return this._styleInstance.style(props, ...args);
    } else {
      return style(props, ...args);
    }
  }
}
