import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageErrorNotFound } from './mother.js';
import { QBtn } from 'quasar';

export interface RenderPageErrorNotFound extends MotherPageErrorNotFound {}

@Local()
export class RenderPageErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <QBtn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
        </div>
      </div>
    );
  }
}
