import { BeanControllerPageBase, Local } from 'zova';
import { ControllerCard } from '../../.metadata/index.js';
import { ScopeModule } from '../../.metadata/this.js';

@Local()
export class ControllerPageComponent extends BeanControllerPageBase<ScopeModule> {
  resetTime: Date = new Date();
  cardRef: ControllerCard;
}
