import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerLayoutEmpty } from './controller.js';
import { VApp, VMain } from 'vuetify/components';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <VApp>
        <VMain>
          <router-view />
        </VMain>
      </VApp>
    );
  }
}
