import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelTabs extends BeanModelBase<ScopeModule> {
  protected async __init__() {}

  protected __dispose__() {}
}
