import { BeanRenderBase, Local } from 'zova';
import type { StyleErrorNotFound } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { QBtn, QPage } from 'quasar';

export interface RenderErrorNotFound extends StyleErrorNotFound {}

@Local()
export class RenderErrorNotFound extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <QPage>
        <div class="text-center q-pa-md">
          <div>
            <div style="font-size: 30vh">404</div>

            <div style="font-size: 30px;line-height:1;opacity:.4">Oops. Nothing here...</div>

            <QBtn class="q-mt-xl" outline unelevated to="/" label="Go Home" no-caps />
          </div>
        </div>
      </QPage>
    );
  }
}
