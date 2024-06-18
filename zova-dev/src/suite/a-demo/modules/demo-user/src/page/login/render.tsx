import { BeanRenderBase, Local } from 'zova';
import type { StyleLogin } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderLogin extends StyleLogin {}

@Local()
export class RenderLogin extends BeanRenderBase<ScopeModule> {
  render() {
    return <div></div>;
  }
}
