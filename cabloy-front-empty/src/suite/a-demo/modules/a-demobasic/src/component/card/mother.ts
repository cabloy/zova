import { BeanMotherBase, Local } from '@cabloy/front';
import { JSX } from 'vue/jsx-runtime';

export interface Props {
  header?: string;
  content?: string;
  footer?: string;
}

export type Emits = {
  (e: 'reset', time: Date): void;
};

export interface Slots {
  header?(): JSX.Element;
  default?(): JSX.Element;
  footer?(): JSX.Element;
}

@Local()
export class MotherCard extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    header: 'default header',
  };
}
