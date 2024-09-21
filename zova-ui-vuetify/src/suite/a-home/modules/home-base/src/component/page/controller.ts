import { BeanControllerBase, Local, PropsBase } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';
import { JSX } from 'vue/jsx-runtime';

export interface Props extends PropsBase<ControllerPage, Slots> {}

export type Emits = {};

export interface Slots {
  default?(): JSX.Element;
}

@Local()
export class ControllerPage extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  protected async __init__() {}
}
