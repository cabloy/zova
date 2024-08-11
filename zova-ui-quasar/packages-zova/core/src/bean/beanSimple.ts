import { ZovaApplication } from '../core/app/index.js';
import { ZovaContext } from '../core/context/index.js';

export class BeanSimple {
  protected app: ZovaApplication;
  protected ctx: ZovaContext;

  protected get bean() {
    return this.ctx.bean;
  }
}
