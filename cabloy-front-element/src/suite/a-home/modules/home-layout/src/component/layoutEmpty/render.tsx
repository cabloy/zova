import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerLayoutEmpty } from './controller.js';
import { ElConfigProvider } from 'element-plus';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <ElConfigProvider>
        <router-view />
      </ElConfigProvider>
    );
  }
}
