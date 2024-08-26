import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { VApp, VMain } from 'vuetify/components';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <VApp>
        <VMain>
          <RouterView />
        </VMain>
      </VApp>
    );
  }
}
