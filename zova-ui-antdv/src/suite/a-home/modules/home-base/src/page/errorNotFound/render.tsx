import { BeanRenderBase, Local } from 'zova';
import type { StyleErrorNotFound } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { Button } from 'ant-design-vue';

export interface RenderErrorNotFound extends StyleErrorNotFound {}

@Local()
export class RenderErrorNotFound extends BeanRenderBase<ScopeModule> {
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
