import { BeanRenderBase, Local } from 'zova';
import type { StylePage } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderPage extends StylePage {}

@Local()
export class RenderPage extends BeanRenderBase<ScopeModule> {
  render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
