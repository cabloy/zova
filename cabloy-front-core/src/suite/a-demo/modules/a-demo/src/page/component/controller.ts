import { BeanControllerPageBase, Local } from '@cabloy/front';
import { ControllerCard } from '../../component/card/controller.js';
import { ScopeModule } from '../../resource/this.js';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef: ControllerCard;
}
