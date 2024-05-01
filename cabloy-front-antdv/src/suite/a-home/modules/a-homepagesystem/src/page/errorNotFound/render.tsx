import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherPageErrorNotFound } from './mother.js';
import { Button } from 'ant-design-vue';
import { CabloyIcon } from './cabloyIcon.js';

export interface RenderPageErrorNotFound extends MotherPageErrorNotFound { }

@Local()
export class RenderPageErrorNotFound extends BeanRenderBase {
  render() {
    return (
      <div class="fill-height bg-blue text-white text-center">
        <div>
          <CabloyIcon name='::done' width={48} height={48} style="color: green;"></CabloyIcon>
          <div style="font-size: 30vh">404</div>

          <div class="text-h2" style="opacity:.4">
            Oops. Nothing here...
          </div>

          <Button onClick={() => {
            this.$router.push('/');
          }}>Go Home</Button>
        </div>
      </div>
    );
  }
}
