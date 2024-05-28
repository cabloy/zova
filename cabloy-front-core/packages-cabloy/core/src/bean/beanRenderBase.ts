import { Use } from '../decorator/class/use.js';
import { Cast } from '../types/utils/cast.js';
import { BeanBase } from './beanBase.js';

export class BeanRenderBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  @Use()
  $$controller: unknown;

  render() {
    return;
  }

  protected __get__(prop) {
    return Cast(this).$$controller[prop];
  }

  protected __set__(prop, value) {
    Cast(this).$$controller[prop] = value;
  }
}
