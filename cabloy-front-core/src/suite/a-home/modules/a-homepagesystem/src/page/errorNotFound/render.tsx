import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageErrorNotFound } from './mother.js';
import { RouterLink } from 'vue-router';

export interface RenderPageErrorNotFound extends MotherPageErrorNotFound {}

@Local()
export class RenderPageErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div class="fill-height bg-blue text-white text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <RouterLink to="/">Go Home</RouterLink>
        </div>
      </div>
    );
  }
}
