import { BeanStyleBase, Local } from 'zova';
import type { ControllerPageTodo } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface StyleTodo extends ControllerPageTodo {}

@Local()
export class StyleTodo extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
