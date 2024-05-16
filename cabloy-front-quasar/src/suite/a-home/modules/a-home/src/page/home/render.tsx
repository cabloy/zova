import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherPageHome } from './mother.js';

export interface RenderPageHome extends MotherPageHome {}

@Local()
export class RenderPageHome extends BeanRenderBase {
  render() {
    return (
      <div class="text-center q-pa-md flex flex-center">
        <div>
          <div style="font-size: 5vh">Hello CabloyJS</div>

          <div class="text-h5" style="opacity:.4">
            Less is more, while more is less
          </div>
        </div>
      </div>
    );
  }
}
