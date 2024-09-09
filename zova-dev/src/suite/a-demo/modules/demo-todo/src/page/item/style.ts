import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageItem } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleItem extends ControllerPageItem {}

@Local()
export class StyleItem extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
