import { BeanControllerBase, Local } from 'zova';

export interface Props {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerEssentialLink extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}
