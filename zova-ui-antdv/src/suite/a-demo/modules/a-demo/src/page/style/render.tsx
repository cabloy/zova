import { BeanRenderBase, Local } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { Button } from 'ant-design-vue';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class={this.$class.textCenter}>
        <div class={this.textColor}>Hello World</div>
        <Button
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </Button>
      </div>
    );
  }
}
