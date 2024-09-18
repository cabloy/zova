import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageHome } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleHome extends ControllerPageHome {}

@Local()
export class StyleHome extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
