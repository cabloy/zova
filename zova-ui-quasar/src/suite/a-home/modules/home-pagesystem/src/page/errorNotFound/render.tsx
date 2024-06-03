import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageErrorNotFound } from './controller.js';
import { QBtn, QPage } from 'quasar';

export interface RenderPageErrorNotFound extends ControllerPageErrorNotFound {}

@Local()
export class RenderPageErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <QPage>
        <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
          <div>
            <div style="font-size: 30vh">404</div>

            <div class="text-h2" style="opacity:.4">
              Oops. Nothing here...
            </div>

            <QBtn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
          </div>
        </div>
      </QPage>
    );
  }
}
