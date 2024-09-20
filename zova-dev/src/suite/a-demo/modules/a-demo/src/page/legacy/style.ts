import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageLegacy } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleLegacy extends ControllerPageLegacy {}

@Local()
export class StyleLegacy extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
