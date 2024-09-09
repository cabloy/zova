import { BeanRenderBase, Local } from 'zova';
import type { StyleHome } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { QPage } from 'quasar';

export interface RenderHome extends StyleHome {}

@Local()
export class RenderHome extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <QPage>
        <div class="text-center q-pa-md flex flex-center">
          <div>
            <div style="font-size: 36px">Hello Zova</div>
            <div style="font-size: 24px;opacity:.4">Less is more, while more is less</div>
          </div>
        </div>
      </QPage>
    );
  }
}
