import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageHome } from './controller.js';

export interface RenderHome extends ControllerPageHome {}

@Local()
export class RenderHome extends BeanRenderBase {
  render() {
    return (
      <div
        class="text-center"
        style={{
          width: '100%',
        }}
      >
        <div>
          <div style="font-size: 5vh">Hello Zova</div>

          <div class="text-h5" style="opacity:.4">
            Less is more, while more is less
          </div>
        </div>
      </div>
    );
  }
}
