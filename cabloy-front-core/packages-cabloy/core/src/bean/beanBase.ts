import { RendererNode } from 'vue';
import { Cast } from '../types/utils/cast.js';
import { BeanBaseSimple } from './beanBaseSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { AppEvent } from '../core/component/event.js';
import { getIcon } from './resource/index.js';

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  public get $el(): RendererNode {
    if (!this.ctx) {
      throw new Error('$el can not be used inside global bean.');
    }
    return this.ctx.meta.el;
  }

  public get $text(): IModuleLocaleText {
    return this.app.meta.text;
  }

  public get $event(): AppEvent {
    return this.app.meta.event;
  }

  public get $icon(): typeof getIcon {
    return getIcon;
  }

  // need not
  // protected async __init__() {}
  // protected __dispose__() {}

  protected get scope() {
    return this.getScope() as TScopeModule;
  }

  protected getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  protected getScope<T>(moduleScope: string): T;
  protected getScope(): TScopeModule;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.app.bean.scope(this.moduleBelong) as TScopeModule;
    }
    return this.app.bean.scope(moduleScope);
  }

  dispose() {
    const self = Cast(this);
    if (self.__dispose__) {
      self.__dispose__();
    }
  }
}
