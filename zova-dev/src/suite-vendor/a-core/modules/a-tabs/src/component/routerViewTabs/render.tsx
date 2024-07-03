import { BeanRenderBase, Local } from 'zova';
import type { StyleRouterViewTabs } from './style.js';
import { ScopeModule } from '../../resource/this.js';

export interface RenderRouterViewTabs extends StyleRouterViewTabs {}

@Local()
export class RenderRouterViewTabs extends BeanRenderBase<ScopeModule> {
  render() {
    return <div></div>;
  }
}
