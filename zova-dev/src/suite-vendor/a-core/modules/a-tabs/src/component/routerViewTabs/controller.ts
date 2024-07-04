import { BeanControllerBase, Cast, Local, PropsBase } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs, ModelTabsOptions, RouterTab } from '../../bean/model.tabs.js';
import { RouterViewSlotParams } from './render.jsx';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { nextTick, watch } from 'vue';

export interface Props extends PropsBase<ControllerRouterViewTabs, Slots> {
  scene?: string;
  max?: number;
  persister?: boolean;
  getAffixTabs: () => RouterTab[] | undefined;
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

    // watch
    watch(
      this.$props.getAffixTabs,
      value => {
        this.$$modelTabs.addAffixTabs(value);
      },
      { immediate: true },
    );
  }

  _handleComponentName(component: RouterViewSlotParams) {
    let name = component.Component.type.name;
    if (name) return name;
    name = component.route.meta.name || component.route.name?.toString() || component.route.path;
    Cast(component.Component.type).name = name;
    return name;
  }

  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'key'): string;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'keepalive'): boolean;
  _handleRouteProp(route: RouteLocationNormalizedLoaded, prop: 'key' | 'keepalive') {
    let value = route.meta[prop];
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
    // key
    const keepalive = this._handleRouteProp(component.route, 'keepalive');
    // tab
    const tab = { key: component.route.fullPath, name, keepalive };
    // add tab
    nextTick(() => {
      this.$$modelTabs.addTab(tab);
    });
    return { key };
  }
}
