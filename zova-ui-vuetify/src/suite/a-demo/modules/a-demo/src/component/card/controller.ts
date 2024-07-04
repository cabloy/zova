import { BeanControllerBase, Local, PropsBase } from 'zova';
import { JSX } from 'vue/jsx-runtime';

export interface Props extends PropsBase<ControllerCard, Slots> {
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
export class ControllerCard extends BeanControllerBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    header: 'default header',
  };
}
