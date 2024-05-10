import { BeanMotherBase, Local, Use } from '@cabloy/front';
import { RenderLayoutEmpty } from './render.jsx';

export interface Props {
  name?: string;
}

export type Emits = {};

export interface Slots {}

@Local()
export class MotherLayoutEmpty extends BeanMotherBase<Props, Emits, Slots> {
  static $propsDefault = {
    name: '',
  };

  @Use()
  $$render: RenderLayoutEmpty;
}
