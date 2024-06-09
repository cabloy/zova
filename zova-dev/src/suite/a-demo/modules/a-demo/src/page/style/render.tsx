import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageStyle } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderStyle extends ControllerPageStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return <div>Hello World</div>;
  }
}
