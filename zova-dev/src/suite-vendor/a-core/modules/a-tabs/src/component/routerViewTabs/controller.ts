import { BeanControllerBase, Local, PropsBase } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs, ModelTabsOptions } from '../../bean/model.tabs.js';

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

  protected __dispose__() {}
}
