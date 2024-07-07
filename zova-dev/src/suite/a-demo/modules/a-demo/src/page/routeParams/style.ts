import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageRouteParams } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StyleRouteParams extends ControllerPageRouteParams {}

@Local()
export class StyleRouteParams extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
