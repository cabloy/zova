import { BeanRenderBase, Local } from 'zova';
import type { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderLayoutDefault extends StyleLayoutDefault {}

@Local()
export class RenderLayoutDefault extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {this.$$renderHeader.render()}
          {this.$$renderContent.render()}
        </div>
        {this.$$renderSidebar.render()}
      </div>
    );
  }
}
