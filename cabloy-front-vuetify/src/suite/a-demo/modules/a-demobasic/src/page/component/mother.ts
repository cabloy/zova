import { BeanMotherPageBase, Local } from '@cabloy/front';
import { MotherCard } from '../../component/card/mother.js';
import { ScopeModule } from '../../resource/this.js';

@Local()
export class MotherPageComponent extends BeanMotherPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef: MotherCard;
}
