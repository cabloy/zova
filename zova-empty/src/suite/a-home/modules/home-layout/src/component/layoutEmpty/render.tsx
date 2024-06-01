import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerLayoutEmpty } from './controller.js';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <div>
        <router-view />
      </div>
    );
  }
}
