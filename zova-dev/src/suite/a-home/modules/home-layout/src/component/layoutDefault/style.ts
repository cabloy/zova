import { BeanStyleBase, Local } from 'zova';
import type { ControllerLayoutDefault } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StyleLayoutDefault extends ControllerLayoutDefault {}

@Local()
export class StyleLayoutDefault extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
