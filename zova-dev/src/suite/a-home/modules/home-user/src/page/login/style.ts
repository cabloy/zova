import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageLogin } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleLogin extends ControllerPageLogin {}

@Local()
export class StyleLogin extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
