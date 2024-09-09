import { BeanRenderBase, Local } from 'zova';
import type { StyleRouterViewTabs } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ComponentInternalInstance, KeepAlive, Transition } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';

export interface RenderRouterViewTabs extends StyleRouterViewTabs {}

export interface RouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}

@Local()
export class RenderRouterViewTabs extends BeanRenderBase<ScopeModule> {
  render() {
    const slots = {
      default: component => {
        const { componentKey } = this._handleComponent(component);
        return (
          <Transition>
            <KeepAlive include={this.$$modelTabs.keepAliveInclude}>
              <component.Component key={componentKey}></component.Component>
            </KeepAlive>
          </Transition>
        );
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
