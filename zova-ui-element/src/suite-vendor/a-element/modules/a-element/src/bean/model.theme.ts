import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelTheme extends BeanModelBase<ScopeModule> {
  cBrand: string;

  protected async __init__() {
    this.cBrand = this.$useQueryMem({
      queryKey: ['cBrand'],
    });
  }
}
