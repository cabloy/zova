import { BeanRenderBase, Local } from 'zova';
import type { StylePinia } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderPinia extends StylePinia {}

@Local()
export class RenderPinia extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>count: {this.$$counter.count}</div>
        <div>doubleCount: {this.$$counter.doubleCount}</div>
        <div>name: {this.$$counter.name}</div>
        <button
          onClick={() => {
            this.$$counter.increment();
          }}
        >
          Increment
        </button>
      </div>
    );
  }
}
