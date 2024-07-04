import { BeanControllerBase, Local } from 'zova';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};
}
