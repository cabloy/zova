import { RendererNode } from 'vue';
import { appResource } from '../core/resource.js';
import { Cast } from '../types/utils/cast.js';
import { StateLock } from '../utils/stateLock.js';
import { BeanSimple } from './beanSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { AppEvent } from '../core/component/event.js';

export class BeanBase<TScopeModule = unknown> extends BeanSimple {
  private __beanFullName__: string;
  private __moduleBelong__?: string;
  // @ts-ignore: ignore
  private __inited__: StateLock;

  public get $el(): RendererNode {
    return this.ctx.$el;
  }

  public get $text(): IModuleLocaleText {
    return this.app.meta.text;
  }

  public get $event(): AppEvent {
    return this.app.meta.event;
  }

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this.__moduleBelong__ = moduleBelong;
    this.__inited__ = StateLock.create();
  }

  // need not
  // protected async __init__() {}
  // protected __dispose__() {}

  protected get moduleBelong() {
    return this.__moduleBelong__ || appResource._getModuleBelong(this.__beanFullName__);
  }

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
