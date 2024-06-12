import { BeanRenderBase, Local } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { VBtn } from 'vuetify/components';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class={this.$class.textCenter}>
        <div class={this.textColor}>Hello World</div>
        <VBtn
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </VBtn>
      </div>
    );
  }
}
