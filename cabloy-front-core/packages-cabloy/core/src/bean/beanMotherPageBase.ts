import { BeanMotherBase } from './beanMotherBase.js';

export class BeanMotherPageBase<TScopeModule = unknown, Params = unknown, Query = unknown> extends BeanMotherBase<
  unknown,
  unknown,
  {},
  TScopeModule
> {
  public $params: Params;
  public $query: Query;
}
