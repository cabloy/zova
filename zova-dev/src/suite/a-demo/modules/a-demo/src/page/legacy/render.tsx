import { BeanRenderBase, Local } from 'zova';
import type { StyleLegacy } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import Counter from '@/components/counter.vue';
import { ZPage } from 'zova-module-home-base';

export interface RenderLegacy extends StyleLegacy {}

@Local()
export class RenderLegacy extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage>
        <div>Legacy Vue3 composables/components can be used directly in Zova</div>
        <Counter></Counter>
      </ZPage>
    );
  }
}
