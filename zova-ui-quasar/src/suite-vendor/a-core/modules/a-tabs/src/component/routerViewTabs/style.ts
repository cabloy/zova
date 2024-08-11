import { BeanStyleBase, Local } from 'zova';
import type { ControllerRouterViewTabs } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StyleRouterViewTabs extends ControllerRouterViewTabs {}

@Local()
export class StyleRouterViewTabs extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
