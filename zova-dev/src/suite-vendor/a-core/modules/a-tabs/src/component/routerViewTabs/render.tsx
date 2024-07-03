import { BeanRenderBase, Cast, Local } from 'zova';
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
  _handleName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.tab?.name || component.route.name?.toString() || component.route.path;
    Cast(component.Component.type).name = name;
    return name;
  }

  _handleComponent(component: RouterViewSlotParams) {
    // name
    const name = this._handleName(component);
    console.log(component);
    console.log(name);
  }
  render() {
    const slots = {
      default: component => {
        this._handleComponent(component);
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
