import { BeanRenderBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import type { StyleStyle } from './style.js';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div class={this.textColor}>Hello World</div>
        <button
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </button>
      </div>
    );
  }
}
