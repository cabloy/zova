import { BeanControllerBase, Local, PropsBase } from 'zova';

export interface Props extends PropsBase<ControllerEssentialLink, Slots> {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name: string } | string;
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
