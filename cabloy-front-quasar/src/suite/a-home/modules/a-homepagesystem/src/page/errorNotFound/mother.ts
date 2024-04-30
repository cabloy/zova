import { BeanMotherPageBase, Local, Use } from '@cabloy/front-core';
import { RenderPageErrorNotFound } from './render.jsx';

@Local()
export class MotherPageErrorNotFound extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageErrorNotFound;
}
