import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageLocale } from './controller.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZPage } from 'zova-module-home-base';

export interface RenderLocale extends ControllerPageLocale {}

@Local()
export class RenderLocale extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage>
        <div>
          {this.app.meta.locale.current}: {this.scope.locale.HelloWorld()}
        </div>
        <button
          class="btn btn-primary"
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
      </ZPage>
    );
  }
}
