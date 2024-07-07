import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteParams } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouteParams extends StyleRouteParams {}

@Local()
export class RenderRouteParams extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <div>to be done</div>
      </this.$component.page>
    );
  }
}
