import { BeanRenderBase, Local, iconh } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderTheme extends StyleLayoutDefault {}

@Local()
export class RenderTheme extends BeanRenderBase<ScopeModule> {
  _renderThemeDark() {
    const themes = [
      {
        mode: false,
        title: this.scope.locale.ThemeLight(),
      },
      {
        mode: true,
        title: this.scope.locale.ThemeDark(),
      },
      {
        mode: 'auto',
        title: this.scope.locale.ThemeAuto(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh('::dark-theme')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {themes.map(item => {
              return (
                <li key={item.mode.toString()} class={this.$theme.darkMode === item.mode ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.$theme.darkMode = item.mode as any;
                    }}
                  >
                    {iconh(this.$theme.darkMode === item.mode ? '::done' : '::none')}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }

  _renderThemeName() {
    const themes = [
      {
        name: 'home-theme.theme.default',
        title: this.scope.locale.ThemeDefault(),
      },
      {
        name: 'a-demo.theme.orange',
        title: this.scope.locale.ThemeOrange(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh(':outline:theme-outline')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {themes.map(item => {
              return (
                <li key={item.name} class={this.$theme.name === item.name ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.$theme.name = item.name as any;
                    }}
                  >
                    {iconh(this.$theme.name === item.name ? '::done' : '::none')}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    );
  }
}
