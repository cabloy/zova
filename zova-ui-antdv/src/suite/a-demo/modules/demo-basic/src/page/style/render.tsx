import { BeanRenderBase, Local, getBeanName } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { Button, Radio, RadioGroup } from 'ant-design-vue';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class={this.$class.textCenter}>
        <div class={this.cTextColor}>Hello World</div>
        <Button
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </Button>
        <hr></hr>
        <div>
          <RadioGroup v-model:value={this.$theme.darkMode}>
            <Radio value={false}>Light</Radio>
            <Radio value={true}>Dark</Radio>
            <Radio value={'auto'}>Auto</Radio>
          </RadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.colorPrimary }}>theme: {this.$theme.name}</div>
          <RadioGroup v-model:value={this.$theme.name}>
            <Radio value={getBeanName('home-base.theme.default')}>Default</Radio>
            <Radio value={getBeanName('demo-basic.theme.orange')}>Orange</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }
}
