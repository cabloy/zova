import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { App, ConfigProvider } from 'ant-design-vue';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <ConfigProvider>
        <App>
          <router-view />
        </App>
      </ConfigProvider>
    );
  }
}
