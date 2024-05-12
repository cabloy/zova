import { BeanBase } from './beanBase.js';
import { IMotherData } from './type.js';

export class BeanMotherPageBase<
  TScopeModule = unknown,
  Query = unknown,
  Params = unknown,
> extends BeanBase<TScopeModule> {
  public $params: Params;
  public $query: Query;

  /** @internal */
  public __initMotherData(motherData: IMotherData) {
    this.app.meta.module._monkeyModuleSync('motherDataInit', undefined, motherData, this);
  }
}
