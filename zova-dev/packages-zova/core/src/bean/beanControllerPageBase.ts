import { BeanBase } from './beanBase.js';
import { IControllerData } from './type.js';

export class BeanControllerPageBase<
  TScopeModule = unknown,
  Query = unknown,
  Params = unknown,
> extends BeanBase<TScopeModule> {
  public $params: Params;
  public $query: Query;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    if (this.app) {
      this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
    }
  }
}
