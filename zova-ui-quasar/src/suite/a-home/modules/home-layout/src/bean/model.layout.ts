import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelLayout extends BeanModelBase<ScopeModule> {
  leftDrawerOpenPC: boolean;

  protected async __init__() {
    this.leftDrawerOpenPC = !this.app.config.ssr.optimization.bodyHiddenBeforeLoad
      ? this.app.config.layout.sidebar.leftOpenPC
      : this.$useQueryLocal({
          queryKey: ['leftDrawerOpenPC'],
          meta: {
            defaultData: this.app.config.layout.sidebar.leftOpenPC,
          },
        });
  }
}
