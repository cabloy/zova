import { BeanBase, TypeEventOff, Virtual } from 'zova';
import { StoreRouterLike } from './store.router.js';

@Virtual()
export class BeanRouterBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  private _eventRouterGuards: TypeEventOff;

  protected async __init__() {
    this._eventRouterGuards = this.app.meta.event.on('a-router:routerGuards', async (context, next) => {
      this.onRouterGuards(context.data);
      await next();
    });
  }

  protected __dispose__() {
    if (this._eventRouterGuards) {
      this._eventRouterGuards();
    }
  }

  protected onRouterGuards(_router: StoreRouterLike) {}
}
