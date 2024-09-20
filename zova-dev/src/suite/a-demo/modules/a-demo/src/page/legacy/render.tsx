import { BeanRenderBase, Local } from 'zova';
import type { StyleLegacy } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderLegacy extends StyleLegacy {}

@Local()
export class RenderLegacy extends BeanRenderBase<ScopeModule> {
  render() {
    return <div></div>;
  }
}
