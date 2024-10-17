import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';

export interface Props extends PropsBase<ControllerEssentialLink, Slots> {
  title?: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerEssentialLink extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerEssentialLink.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {
    caption: '',
    icon: '',
  };
}
