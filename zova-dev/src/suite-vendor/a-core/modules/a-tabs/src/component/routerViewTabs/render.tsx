import { BeanRenderBase, Cast, Local } from 'zova';
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
  _handleComponentName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.tab?.name || component.route.name?.toString() || component.route.path;
    Cast(component.Component.type).name = name;
    return name;
  }

  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'key' | 'title' | 'icon') {
    let value = route.meta.tab?.[prop];
    if (typeof value === 'function') {
      value = value(route);
    }
    return value;
  }

  _handleComponent(component: RouterViewSlotParams) {
    // name
    const name = this._handleComponentName(component);
    // key
    const key = this._handleRouteProp(component.route, 'key') || name;
    // title
    const title = this._handleRouteProp(component.route, 'title');
    // icon
    const icon = this._handleRouteProp(component.route, 'icon');
    // tab
    const tab = { key, title, icon };
    // add tab
    nextTick(() => {
      this.$$modelTabs.addTab(tab);
    });
    return tab;
  }
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
