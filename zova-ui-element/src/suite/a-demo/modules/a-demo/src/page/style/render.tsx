import { BeanRenderBase, Local, getBeanName } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ElButton, ElRadio, ElRadioGroup } from 'element-plus';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class={this.$class.textCenter}>
        <div class={this.textColor}>Hello World</div>
        <ElButton
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </ElButton>
        <hr></hr>
        <div>
          <ElRadioGroup v-model={this.$theme.darkMode}>
            <ElRadio value={false}>Light</ElRadio>
            <ElRadio value={true}>Dark</ElRadio>
            <ElRadio value={'auto'}>Auto</ElRadio>
          </ElRadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token['color-primary'] }}>theme: {this.$theme.name}</div>
          <ElRadioGroup v-model={this.$theme.name}>
            <ElRadio value={getBeanName('home-theme.theme.default')}>Default</ElRadio>
            <ElRadio value={getBeanName('a-demo.theme.orange')}>Orange</ElRadio>
          </ElRadioGroup>
        </div>
      </div>
    );
  }
}
