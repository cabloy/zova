import { BeanRenderBase, Local, Use } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import type { RenderLayoutDefault } from './render.jsx';

export interface RenderSidebar extends StyleLayoutDefault {}

@Local()
export class RenderSidebar extends BeanRenderBase<ScopeModule> {
  @Use()
  $$r: RenderLayoutDefault;

  render() {
    return (
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        {this.$$r.$$renderMenu.render()}
      </div>
    );
  }
}
