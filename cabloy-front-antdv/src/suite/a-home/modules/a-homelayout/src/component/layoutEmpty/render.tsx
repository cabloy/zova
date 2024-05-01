import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutEmpty } from './mother.js';
import { ConfigProvider } from 'ant-design-vue';

export interface RenderLayoutEmpty extends MotherLayoutEmpty { }

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return <ConfigProvider>
      <router-view />
    </ConfigProvider>
  }
}
