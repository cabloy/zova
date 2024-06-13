import { BeanRenderBase, Local, getBeanName } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import type { StyleStyle } from './style.js';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <hr></hr>
        <div class={this.textColor}>Hello World</div>
        <button
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </button>
        <hr></hr>
        <div class={this.$class.textCenter}>
          <div>$class.textCenter</div>
          <button class={this.$class.buttonPrimary}>$token.color.primary: {this.$token.color.primary}</button>
          <hr></hr>
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
            <hr></hr>
            <div style={{ color: this.$token.color.primary }}>theme: {this.$theme.name}</div>
            <div>
              <select
                onChange={async e => {
                  const target = e.target as HTMLSelectElement;
                  await this.$theme.setTheme(target.value as any);
                }}
              >
                <option
                  value={getBeanName('home-theme.theme.default')}
                  selected={this.$theme.name === getBeanName('home-theme.theme.default')}
                >
                  Default
                </option>
                <option
                  value={getBeanName('a-demo.theme.orange')}
                  selected={this.$theme.name === getBeanName('a-demo.theme.orange')}
                >
                  Orange
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
