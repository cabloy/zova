import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { ConfigProvider, StyleProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <StyleProvider cache={this.$antdvStyleCache}>
        <ConfigProvider>
          <RouterView />
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
