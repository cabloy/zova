import { BeanRenderBase, Local } from 'zova';
import type { StylePinia } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderPinia extends StylePinia {}

@Local()
export class RenderPinia extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <div>count: {this.$$counter.count}</div>
        <div>doubleCount: {this.$$counter.doubleCount}</div>
        <div>name: {this.$$counter.name}</div>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.$$counter.increment();
          }}
        >
          Increment
        </button>
      </this.$component.page>
    );
  }
}
