import { BeanRenderBase, Local } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { QBtn, QPage } from 'quasar';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <QPage padding class={this.$class.textCenter}>
        <div class={this.textColor}>Hello World</div>
        <QBtn
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </QBtn>
      </QPage>
    );
  }
}
