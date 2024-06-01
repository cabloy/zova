import { BeanControllerBase, Local } from 'zova';

export interface Props {
  name?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutEmpty extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };
}
