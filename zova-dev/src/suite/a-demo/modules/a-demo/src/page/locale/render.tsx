import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageLocale } from './controller.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderPageLocale extends ControllerPageLocale {}

@Local()
export class RenderPageLocale extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>{this.scope.locale.HelloWorld()}</div>
        <div>{this.app.meta.locale.current}</div>
        <button
          onClick={() => {
            if (this.app.meta.locale.current === 'en-us') {
              this.app.meta.locale.current = 'zh-cn';
            } else {
              this.app.meta.locale.current = 'en-us';
            }
          }}
        >
          {this.scope.locale.ChangeLanguage()}
        </button>
      </div>
    );
  }
}
