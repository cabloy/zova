import { BeanRenderBase, Local } from 'zova';
import type { StyleRouteQuery2 } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouteQuery2 extends StyleRouteQuery2 {}

@Local()
export class RenderRouteQuery2 extends BeanRenderBase<ScopeModule> {
  render() {
    return <div></div>;
  }
}
