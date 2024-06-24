import { BeanContainerLike, SymbolBeanRoot } from '../../bean/beanContainer.js';

export interface IInjectRecord {
  [SymbolBeanRoot]: BeanContainerLike;
}
export type TypeInjectRecordKeys = keyof IInjectRecord;
