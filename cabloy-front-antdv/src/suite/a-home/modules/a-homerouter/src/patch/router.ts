import { BeanBase, Local, TypeEventOff } from '@cabloy/front';
import { ScopeModule } from '../resource/this.js';
import { StoreRouterLike } from 'cabloy-module-front-a-router';

@Local()
export class PatchRouter extends BeanBase<ScopeModule> {
  eventRouterGuards: TypeEventOff;

  protected async __init__() {
    this.eventRouterGuards = this.app.meta.event.on('a-router:routerGuards', async (context, next) => {
      this._routerGuards(context.data);
      await next();
    });
  }

  protected __dispose__() {
    if (this.eventRouterGuards) {
      this.eventRouterGuards();
    }
  }

  private _routerGuards(_router: StoreRouterLike) {
    //router.beforeEach(async to => {});
  }
}
