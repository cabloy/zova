import { BeanRenderBase, Local } from 'zova';
import type { ControllerLayoutEmpty } from './controller.js';
import { QLayout, QPageContainer } from 'quasar';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <QLayout>
        <QPageContainer>
          <router-view />
        </QPageContainer>
      </QLayout>
    );
  }
}
