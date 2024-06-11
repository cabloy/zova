import { BeanRenderBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import type { StyleStyle } from './style.js';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>--------------------</div>
        <div class={this.textColor}>Hello World</div>
        <button
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </button>
        <div>--------------------</div>
        <div class={this.$class.textCenter}>
          <div>$class.textCenter</div>
          <button class={this.$class.buttonPrimary}>$token.color.primary: {this.$token.color.primary}</button>
          <div>--------------------</div>
          <div class={this.pageColor}>
            <div>dark: {String(this.$theme.dark)}</div>
            <div>dark mode: {String(this.$theme.darkMode)}</div>
            <div>
              <select
                onChange={async e => {
                  const target = e.target as HTMLSelectElement;
                  const value = target.value;
                  const darkMode = value === 'auto' ? value : value === 'true' ? true : false;
                  await this.$theme.setDark(darkMode);
                }}
              >
                <option value={false} selected={this.$theme.darkMode === false}>
                  Light
                </option>
                <option value={true} selected={this.$theme.darkMode === true}>
                  Dark
                </option>
                <option value={'auto'} selected={this.$theme.darkMode === 'auto'}>
                  Auto
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
