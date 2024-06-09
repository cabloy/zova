import { BeanRenderBase, Local } from 'zova';
import type { ControllerPageErrorNotFound } from './controller.js';
import { Button } from 'ant-design-vue';

export interface RenderErrorNotFound extends ControllerPageErrorNotFound {}

@Local()
export class RenderErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div class="fill-height bg-blue text-white text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <Button
            onClick={() => {
              this.$router.push('/');
            }}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }
}
