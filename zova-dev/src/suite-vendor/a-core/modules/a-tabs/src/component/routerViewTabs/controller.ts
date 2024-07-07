import { BeanControllerBase, Cast, Local, PropsBase } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs, ModelTabsOptions, RouteTab, RouteTabInfo } from '../../bean/model.tabs.js';
import { RouterViewSlotParams } from './render.jsx';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { nextTick } from 'vue';

export interface Props extends PropsBase<ControllerRouterViewTabs, Slots> {
  scene?: string;
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouteTab[] | undefined;
  getTabInfo: (tab: RouteTab) => Promise<RouteTabInfo | undefined>;
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
      getAffixTabs: this.$props.getAffixTabs,
      getTabInfo: this.$props.getTabInfo,
    };
    this.$$modelTabs = await this.bean._newBean(ModelTabs, true, tabsOptions);
  }

  _handleComponentName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.name || component.route.name?.toString() || component.route.path;
    Cast(component.Component.type).name = name;
    return name;
  }

  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'componentKey' | 'tabKey'): string;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepAlive'): boolean;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop) {
    let value = route.meta[prop];
    if (typeof value === 'function') {
      value = value(route);
    }
    return value;
  }

  _handleComponent(component: RouterViewSlotParams) {
    // fullPath
    const fullPath = component.route.fullPath;
    // name
    const name = this._handleComponentName(component);
    // componentKey
    const componentKey = this._handleRouteProp(component.route, 'componentKey') || name;
    // tabKey
    const tabKey = this._handleRouteProp(component.route, 'tabKey') || fullPath;
    // keepAlive
    const keepAlive = this._handleRouteProp(component.route, 'keepAlive');
    // tab
    const tab = { key: tabKey, fullPath, name, keepAlive };
    // add tab
    nextTick(() => {
      this.$$modelTabs.addTab(tab);
    });
    return { componentKey };
  }
}
