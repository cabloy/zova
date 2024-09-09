import { BeanRenderBase, Local } from 'zova';
import { StyleLayoutDefault } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';

export interface RenderContent extends StyleLayoutDefault {}

@Local()
export class RenderContent extends BeanRenderBase<ScopeModule> {
  _renderContent() {
    return this.$$renderTabs._renderRouterViewTabs();
  }
}
