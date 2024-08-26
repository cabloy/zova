import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { ElConfigProvider } from 'element-plus';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <ElConfigProvider>
        <RouterView />
      </ElConfigProvider>
    );
  }
}
