import { BeanControllerPageBase, Local } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';

@Local()
export class ControllerPageLegacy extends BeanControllerPageBase<ScopeModule> {
  protected async __init__() {}
}
