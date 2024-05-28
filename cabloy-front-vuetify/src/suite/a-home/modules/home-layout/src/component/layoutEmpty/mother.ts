import { BeanMotherBase, Local } from '@cabloy/front';

export interface Props {
  name?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class MotherLayoutEmpty extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };
}
