import { BeanMotherPageBase, Local, Use } from '@cabloy/front';
import { RenderPageComponent } from './render.jsx';

@Local()
export class MotherPageComponent extends BeanMotherPageBase {
  resetTime: Date = new Date();

  @Use()
  $$render: RenderPageComponent;
}
