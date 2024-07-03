import { BeanRenderBase, Local } from 'zova';
import type { StyleRouterViewTabs } from './style.js';
import { ScopeModule } from '../../resource/this.js';
import { ComponentInternalInstance, KeepAlive, Transition, nextTick } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';

export interface RenderRouterViewTabs extends StyleRouterViewTabs {}

export interface RouterViewSlotParams {
  Component: ComponentInternalInstance;
  route: RouteLocationNormalizedLoaded;
}

@Local()
export class RenderRouterViewTabs extends BeanRenderBase<ScopeModule> {
  _handleComponent(component: RouterViewSlotParams) {
    // name
    const name = component.Component.type.name;
    console.log(component);
    console.log(name);
  }
  render() {
    const slots = {
      default: component => {
        nextTick(() => {
          this._handleComponent(component);
        });
        return (
          <Transition>
            <KeepAlive>
              <component.Component></component.Component>
            </KeepAlive>
          </Transition>
        );
      },
    };
    return <RouterView v-slots={slots}></RouterView>;
  }
}
