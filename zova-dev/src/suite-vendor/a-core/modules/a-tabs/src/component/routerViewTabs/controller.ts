import { BeanControllerBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs } from '../../bean/model.tabs.js';

export interface Props {
  scene?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerRouterViewTabs extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  $$modelTabs: ModelTabs;

  protected async __init__() {
    this.$$modelTabs = await this.bean._getBeanSelector(ModelTabs, true, this.$props.scene);
  }

  protected __dispose__() {}
}
