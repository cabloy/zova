import { BeanRenderBase, Local } from 'zova';
import type { StyleHome } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { QPage } from 'quasar';

export interface RenderHome extends StyleHome {}

@Local()
export class RenderHome extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <QPage>
        <div class="text-center q-pa-md flex flex-center">
          <div>
            <div style="font-size: 5vh">Hello Zova</div>

            <div class="text-h5" style="opacity:.4">
              Less is more, while more is less
            </div>
          </div>
        </div>
      </QPage>
    );
  }
}
