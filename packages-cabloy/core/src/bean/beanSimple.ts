import { CabloyApplication } from '../core/app/index.js';
import { CabloyContext } from '../core/context/index.js';

export class BeanSimple {
  protected app: CabloyApplication;
  protected ctx: CabloyContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.app.bean;
  }
}
