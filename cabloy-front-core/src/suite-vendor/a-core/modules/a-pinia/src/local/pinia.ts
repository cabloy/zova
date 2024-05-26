import { BeanBase, Local } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';

@Local()
export class Pinia extends BeanBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
