import { BeanRenderBase, Local } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderSidebar extends StyleLayoutDefault {}

@Local()
export class RenderSidebar extends BeanRenderBase<ScopeModule> {
  _renderSidebar() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$renderMenu._renderMenu()}
      </div>
    );
  }
}
