import { ComponentInternalInstance, markRaw } from 'vue';
import { ZovaApplication } from '../app/application.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { CtxMeta } from './meta.js';
import { Cast } from '../../types/utils/cast.js';

export class ZovaContext {
  instance: ComponentInternalInstance;
  app: ZovaApplication;
  bean: BeanContainer;
  meta: CtxMeta;
  //config: ContextConfig;

  constructor(instance: ComponentInternalInstance) {
    markRaw(this);
    instance.zova = this;
    this.instance = instance;
    this.app = instance.appContext.app.zova;
    this.bean = BeanContainer.create(this.app, this);
    this.meta = this.bean._newBeanSimple(CtxMeta, false);
    this.meta.initialize();
  }

  /** @internal */
  public dispose() {
    this.meta.dispose();
    Cast(this.instance).zova = null;
    Cast(this).instance = null;
    Cast(this).app = null;
    Cast(this).bean = null;
    Cast(this).meta = null;
  }
}

declare module 'vue' {
  export interface ComponentInternalInstance {
    zova: ZovaContext;
  }
}
