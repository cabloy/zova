import { RendererNode } from 'vue';
import { BeanBaseSimple, SymbolModuleBelong } from './beanBaseSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';
import { AppEvent } from '../core/component/event.js';
import { IModuleLocaleText } from './resource/index.js';
import { SSRMetaOptions } from '../types/interface/ssr.js';
import { useMeta } from '../core/context/useMeta.js';
import { CtxSSR } from '../core/context/ssr.js';

const SymbolText = Symbol('SymbolText');

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  protected get $el(): RendererNode {
    if (!this.ctx) {
      throw new Error('$el can not be used inside global bean.');
    }
    return this.ctx.meta.el;
  }

  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }

  protected get $event(): AppEvent {
    return this.app.meta.event;
  }

  protected get $ssr(): CtxSSR {
    return this.ctx.meta.ssr;
  }

  protected $useMeta(options: SSRMetaOptions | (() => SSRMetaOptions)) {
    this.ctx.util.instanceScope(() => {
      useMeta(this.ctx, options);
    });
  }

  // need not
  // protected async __init__() {}
  // protected __dispose__() {}

  protected get scope() {
    return this.getScope() as TScopeModule;
  }

  protected getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  protected getScope(): TScopeModule;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.app.bean.scope(this[SymbolModuleBelong]) as TScopeModule;
    }
    return this.app.bean.scope(moduleScope);
  }

  // need not
  // public dispose() {
  //   const self = Cast(this);
  //   if (self.__dispose__) {
  //     self.__dispose__();
  //   }
  // }
}
