import { BeanControllerBase, Local, Use } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { ModelTabs } from '../../bean/model.tabs.js';

export interface Props {
  name?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerRouterViewTabs extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };

  @Use()
  $$modelTabs: ModelTabs;

  protected async __init__() {}

  protected __dispose__() {}
}
