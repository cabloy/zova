import { BeanRenderBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import type { StyleStyle } from './style.js';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div class={this.classTextColor}>Hello World</div>
        <button
          onClick={() => {
            this.textColor = this.textColor === 'red' ? 'orange' : 'red';
          }}
        >
          Change Text Color
        </button>
      </div>
    );
  }
}
