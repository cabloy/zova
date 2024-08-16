import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelLayout extends BeanModelBase<ScopeModule> {
  leftDrawerOpenPC: boolean;

  protected async __init__() {
    this.leftDrawerOpenPC = this.$useQueryLocal({
      queryKey: ['leftDrawerOpenPC'],
      meta: {
        defaultData: this.scope.config.layout.leftDrawerOpenPC,
      },
    });
  }
}
