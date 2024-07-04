import { BeanRenderBase, Local } from 'zova';
import type { StyleRouterViewTabs } from './style.js';
import { ScopeModule } from '../../resource/this.js';
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
        const tab = this._handleComponent(component);
        return (
          <Transition>
            <KeepAlive>
              <component.Component key={tab.key}></component.Component>
            </KeepAlive>
          </Transition>
        );
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
