import { BeanControllerBase, Local } from 'zova';
import { ScopeModule } from '../../resource/this.js';
import { JSX } from 'vue/jsx-runtime';

export interface Props {
  name?: string;
}

export type Emits = {};

export interface Slots {
  default?(): JSX.Element;
}

@Local()
export class ControllerPage extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };

  protected async __init__() {}

  protected __dispose__() {}
}
