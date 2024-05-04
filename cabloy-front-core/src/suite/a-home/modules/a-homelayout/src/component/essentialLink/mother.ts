import { BeanMotherBase, Local, Use } from '@cabloy/front-core';
import { RenderEssentialLink } from './render.jsx';

export interface Props {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
}

export type Emits = {};

export type Slots = {};

@Local()
export class MotherEssentialLink extends BeanMotherBase<Props, Emits, Slots> {
  static $propsDefault = {
    caption: '',
    icon: '',
  };

  @Use()
  $$render: RenderEssentialLink;
}
