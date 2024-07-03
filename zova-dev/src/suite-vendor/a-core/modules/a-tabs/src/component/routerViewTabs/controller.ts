import { BeanControllerBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';

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

  protected async __init__() {}

  protected __dispose__() {}
}
