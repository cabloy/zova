import { BeanControllerPageBase, Local } from 'zova';
import { ScopeModule } from '../../.metadata/this.js';

@Local()
export class ControllerPageIndex extends BeanControllerPageBase<ScopeModule> {
  protected async __init__() {}
}
