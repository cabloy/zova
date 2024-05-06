import { BeanMotherPageBase, Local, Use } from '@cabloy/front';
import { RenderPageHome } from './render.jsx';

@Local()
export class MotherPageHome extends BeanMotherPageBase {
  @Use()
  $$render: RenderPageHome;
}
