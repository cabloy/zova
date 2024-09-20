import { BeanRenderBase, Local } from 'zova';
import type { StyleLegacy } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import Counter from '@/components/counter.vue';

export interface RenderLegacy extends StyleLegacy {}

@Local()
export class RenderLegacy extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <Counter></Counter>
      </this.$component.page>
    );
  }
}
