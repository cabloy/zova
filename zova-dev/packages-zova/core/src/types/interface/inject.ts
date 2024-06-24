import { BeanContainerLike } from '../../bean/beanContainer.js';

export const SymbolBeanRoot = Symbol('SymbolBeanRoot');

export interface IInjectRecord {
  [SymbolBeanRoot]: BeanContainerLike;
}
export type TypeInjectRecordKeys = keyof IInjectRecord;
