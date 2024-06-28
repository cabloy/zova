import { BeanRenderBase, Local } from 'zova';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { QBtn, QOptionGroup, QPage } from 'quasar';

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
        <hr></hr>
        <div>
          <QOptionGroup
            options={this.themeDarkOptions}
            type="radio"
            inline
            modelValue={this.$theme.darkMode}
            onUpdate:modelValue={event => {
              this.$theme.setDark(event);
            }}
          ></QOptionGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.color.primary }}>theme: {this.$theme.name}</div>
          <QOptionGroup
            options={this.themeNameOptions}
            type="radio"
            inline
            modelValue={this.$theme.name}
            onUpdate:modelValue={event => {
              this.$theme.setTheme(event);
            }}
          ></QOptionGroup>
        </div>
      </QPage>
    );
  }
}
