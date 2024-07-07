import { BeanRenderBase, Local, iconh } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderLocale extends StyleLayoutDefault {}

@Local()
export class RenderLocale extends BeanRenderBase<ScopeModule> {
  _renderLocale() {
    const locales = [
      {
        name: 'en-us',
        title: this.scope.locale.LanguageEnglish(),
      },
      {
        name: 'zh-cn',
        title: this.scope.locale.LanguageChinese(),
      },
    ];
    return (
      <li>
        <details>
          <summary>{iconh('::language')}</summary>
          <ul class="bg-base-100 rounded-t-none p-2 w-48">
            {locales.map(item => {
              return (
                <li key={item.name} class={this.app.meta.locale.current === item.name ? 'disabled' : ''}>
                  <a
                    onClick={() => {
                      this.app.meta.locale.current = item.name as any;
                    }}
                  >
                    {iconh(this.app.meta.locale.current === item.name ? '::done' : '::none')}
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
