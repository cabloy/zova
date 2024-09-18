import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageIndex } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleIndex extends ControllerPageIndex {}

@Local()
export class StyleIndex extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
