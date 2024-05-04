import { Use } from '../decorator/class/use.js';
import { Cast } from '../types/utils/cast.js';
import { BeanBase } from './beanBase.js';

export class BeanRenderBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  @Use()
  $$mother: unknown;

  render() {
    return;
  }

  protected __get__(prop) {
    return Cast(this).$$mother[prop];
  }

  protected __set__(prop, value) {
    Cast(this).$$mother[prop] = value;
  }
}
