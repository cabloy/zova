import { BeanMotherPageBase, Local, Use } from '@cabloy/front';
import { RenderPageComponent } from './render.jsx';
import { MotherCard } from '../../component/card/mother.js';

@Local()
export class MotherPageComponent extends BeanMotherPageBase {
  resetTime: Date = new Date();
  cardRef: MotherCard;

  @Use()
  $$render: RenderPageComponent;
}
