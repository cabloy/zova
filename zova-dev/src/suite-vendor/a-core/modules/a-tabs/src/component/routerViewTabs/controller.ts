import { BeanControllerBase, Cast, Local, PropsBase } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs, ModelTabsOptions } from '../../bean/model.tabs.js';
import { RouterViewSlotParams } from './render.jsx';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { nextTick } from 'vue';
import * as ModuleInfo from '@cabloy/module-info';

export interface Props extends PropsBase<ControllerRouterViewTabs, Slots> {
  scene?: string;
  max?: number;
  persister?: boolean;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerRouterViewTabs extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  $$modelTabs: ModelTabs;

  protected async __init__() {
    const tabsOptions: ModelTabsOptions = {
      scene: this.$props.scene,
      max: this.$props.max,
      persister: this.$props.persister,
    };
    this.$$modelTabs = await this.bean._newBean(ModelTabs, true, tabsOptions);
  }

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

  _handleRouteTitle(route: RouteLocationNormalizedLoaded) {
    const title = this._handleRouteProp(route, 'title') || '';
    const moduleInfo = ModuleInfo.parseInfo(route.fullPath);
    if (!moduleInfo) return title;
    return this.app.meta.locale.getText(moduleInfo.relativeName, undefined, title);
  }

  _handleComponent(component: RouterViewSlotParams) {
    // name
    const name = this._handleComponentName(component);
    // key
    const key = this._handleRouteProp(component.route, 'key') || name;
    // title
    const title = this._handleRouteTitle(component.route);
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
}
