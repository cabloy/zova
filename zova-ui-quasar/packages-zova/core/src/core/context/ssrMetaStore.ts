import { BeanSimple } from '../../bean/beanSimple.js';

export class CtxSSRMetaStore extends BeanSimple {
  private _updateId: number = 0;
  private currentClientMeta;

  protected __init__() {}
}
