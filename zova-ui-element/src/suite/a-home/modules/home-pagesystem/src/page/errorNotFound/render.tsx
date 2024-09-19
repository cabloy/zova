import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageErrorNotFound } from './controller.js';
import { ElButton } from 'element-plus';

export interface RenderErrorNotFound extends ControllerPageErrorNotFound {}

@Local()
export class RenderErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div style="height: 100vh;" class="bg-blue text-white text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <ElButton
            color="white"
            onClick={() => {
              this.$router.push('/');
            }}
          >
            Go Home
          </ElButton>
        </div>
      </div>
    );
  }
}
