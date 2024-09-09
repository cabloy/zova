import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../.metadata/this.js';

@Model()
export class ModelLayout extends BeanModelBase<ScopeModule> {
  leftDrawerOpenPC: boolean;

  protected async __init__() {
    this.leftDrawerOpenPC =
      process.env.SSR && !this.app.config.ssr.optimization.bodyReadyObserver
        ? this.app.config.layout.sidebar.leftOpenPC
        : this.$useQueryLocal({
            queryKey: ['sidebarLeftOpenPC'],
            meta: {
              defaultData: this.app.config.layout.sidebar.leftOpenPC,
            },
          });
  }
}
