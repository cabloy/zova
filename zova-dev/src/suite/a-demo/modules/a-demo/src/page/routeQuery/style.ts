import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageRouteQuery } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleRouteQuery extends ControllerPageRouteQuery {}

@Local()
export class StyleRouteQuery extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
