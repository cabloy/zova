import { BeanRenderBase, Local, getBeanName } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { VBtn, VRadio, VRadioGroup } from 'vuetify/components';

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
        <hr></hr>
        <div>
          <VRadioGroup
            modelValue={this.$theme.darkMode}
            onUpdate:modelValue={event => {
              this.$theme.setDark(event as any);
            }}
            inline
          >
            <VRadio label="Light" value={false}></VRadio>
            <VRadio label="Dark" value={true}></VRadio>
            <VRadio label="Auto" value={'auto'}></VRadio>
          </VRadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.colors.primary }}>theme: {this.$theme.name}</div>
          <VRadioGroup
            modelValue={this.$theme.name}
            onUpdate:modelValue={event => {
              this.$theme.setTheme(event as any);
            }}
            inline
          >
            <VRadio label="Default" value={getBeanName('home-theme.theme.default')}></VRadio>
            <VRadio label="Orange" value={getBeanName('a-demo.theme.orange')}></VRadio>
          </VRadioGroup>
        </div>
      </div>
    );
  }
}
