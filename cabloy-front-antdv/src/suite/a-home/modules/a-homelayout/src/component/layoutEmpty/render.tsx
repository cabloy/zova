import { BeanRenderBase, Local } from '@cabloy/front';
import type { MotherLayoutEmpty } from './mother.js';
import { App, ConfigProvider } from 'ant-design-vue';

export interface RenderLayoutEmpty extends MotherLayoutEmpty { }

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <ConfigProvider>
        <App>
          <router-view />
        </App>
      </ConfigProvider>
    )
  }
}
