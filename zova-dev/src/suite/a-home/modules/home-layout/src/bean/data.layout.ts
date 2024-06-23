import { Data } from 'zova';
import { BeanDataBase } from 'zova-module-a-data';
import { ScopeModule } from '../resource/this.js';

@Data()
export class DataLayout extends BeanDataBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
