import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { App, ConfigProvider, StyleProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <StyleProvider cache={this.$antdvStyleCache}>
        <ConfigProvider>
          <App>
            <RouterView />
          </App>
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
