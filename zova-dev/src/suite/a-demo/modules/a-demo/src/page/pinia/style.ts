import { BeanStyleBase, Local } from 'zova';
import type { ControllerPagePinia } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface StylePinia extends ControllerPagePinia {}

@Local()
export class StylePinia extends BeanStyleBase<ScopeModule> {
  protected async __init__() {}
}
