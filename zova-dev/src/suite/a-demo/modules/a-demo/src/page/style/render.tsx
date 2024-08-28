import { BeanRenderBase, ClientOnly, Local, getBeanName, useComputed } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import type { StyleStyle } from './style.js';

export interface RenderStyle extends StyleStyle {}

@Local()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  renderHello;
  renderHello2;

  protected async __init__() {
    this.renderHello = <div class={this.cTextColor}>Hello World</div>;
    this.renderHello2 = useComputed(() => {
      return <div class={this.cTextColor}>Hello World</div>;
    });
  }
  render() {
    return (
      <this.$component.page>
        <hr></hr>
        <div class={this.cTextColor}>Hello World</div>
        {this.renderHello}
        {this.renderHello2}
        <button
          class="btn btn-primary"
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </button>
        <hr></hr>
        <div class={this.$class.textCenter}>
          <div>$class.textCenter</div>
          <button class={this.$class.buttonPrimary}>{`$token.color.primary: ${this.$token.color.primary}`}</button>
          <hr></hr>
          <div class={this.cBlock}>
            <ClientOnly>
              <div>{`dark: ${String(this.$theme.dark)}`}</div>
            </ClientOnly>
            <ClientOnly>
              <div>{`dark mode: ${String(this.$theme.darkMode)}`}</div>
            </ClientOnly>
            <div>
              <select
                class="select select-bordered w-full max-w-xs"
                onChange={async e => {
                  const target = e.target as HTMLSelectElement;
                  const value = target.value;
                  const darkMode = value === 'auto' ? value : value === 'true' ? true : false;
                  this.$theme.darkMode = darkMode;
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
                class="select select-bordered w-full max-w-xs"
                onChange={async e => {
                  const target = e.target as HTMLSelectElement;
                  this.$theme.name = target.value as any;
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
      </this.$component.page>
    );
  }
}
