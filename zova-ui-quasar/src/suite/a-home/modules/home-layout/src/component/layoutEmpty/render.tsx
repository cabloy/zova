import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { QLayout, QPageContainer } from 'quasar';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <QLayout>
        <QPageContainer>
          <RouterView />
        </QPageContainer>
      </QLayout>
    );
  }
}
