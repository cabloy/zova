import { BeanRenderBase, Local, getBeanName } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { Button, Radio, RadioGroup } from 'ant-design-vue';

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
        <hr></hr>
        <div>
          <RadioGroup
            value={this.$theme.darkMode}
            onUpdate:value={event => {
              this.$theme.setDark(event);
            }}
          >
            <Radio value={false}>Light</Radio>
            <Radio value={true}>Dark</Radio>
            <Radio value={'auto'}>Auto</Radio>
          </RadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.colorPrimary }}>theme: {this.$theme.name}</div>
          <RadioGroup
            value={this.$theme.name}
            onUpdate:value={event => {
              this.$theme.setTheme(event);
            }}
          >
            <Radio value={getBeanName('home-theme.theme.default')}>Default</Radio>
            <Radio value={getBeanName('a-demo.theme.orange')}>Orange</Radio>
          </RadioGroup>
        </div>
      </div>
    );
  }
}
