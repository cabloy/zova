import { BeanControllerBase, Local, PropsBase, RequiredSome } from 'zova';

export interface Props extends PropsBase<ControllerLayoutEmpty, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase<
  unknown,
  RequiredSome<Props, keyof typeof ControllerLayoutEmpty.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {};
}
