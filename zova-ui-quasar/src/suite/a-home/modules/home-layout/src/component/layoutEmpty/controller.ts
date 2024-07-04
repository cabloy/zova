import { BeanControllerBase, Local, PropsBase } from 'zova';

export interface Props extends PropsBase<ControllerLayoutEmpty, Slots> {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};
}
