import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageErrorNotFound } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleErrorNotFound extends ControllerPageErrorNotFound {}

@Local()
export class StyleErrorNotFound extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
