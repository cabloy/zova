import { BeanMotherBase, Local, Use } from '@cabloy/front';
import { RenderEssentialLink } from './render.jsx';

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
export class MotherEssentialLink extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {
    caption: '',
    icon: '',
  };

  @Use()
  $$render: RenderEssentialLink;
}
