import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageLocale } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderPageLocale extends ControllerPageLocale {}

@Local()
export class RenderPageLocale extends BeanRenderBase<ScopeModule> {
  render() {
    return <div></div>;
  }
}
