import { BeanMotherBase, Local, Use } from '@cabloy/front-core';
import { RenderLayoutEmpty } from './render.jsx';

export interface Props {
  name?: string;
}

export type Emits = {};

export type Slots = {};

@Local()
export class MotherLayoutEmpty extends BeanMotherBase<Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };

  @Use()
  $$render: RenderLayoutEmpty;
}
