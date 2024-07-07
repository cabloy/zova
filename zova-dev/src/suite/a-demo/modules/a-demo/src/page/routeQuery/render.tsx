import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouteQuery extends StyleRouteQuery {}

@Local()
export class RenderRouteQuery extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <this.$component.page>
        <div>to be done</div>
      </this.$component.page>
    );
  }
}
