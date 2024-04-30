import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutEmpty } from './mother.js';
import { ElConfigProvider } from 'element-plus';

export interface RenderLayoutEmpty extends MotherLayoutEmpty { }

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
