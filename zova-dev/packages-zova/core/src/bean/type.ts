/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecordKeys = keyof IBeanRecord;

export type TypeBeanRecordSelector<SCENE extends string> = {
  [K in keyof IBeanRecord as K extends `${string}.${SCENE}.${string}` ? K : never]: IBeanRecord[K];
};
export type TypeBeanRecordSelectorKeys<SCENE extends string> = keyof TypeBeanRecordSelector<SCENE>;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;

export interface IControllerDataContext {
  attrs?: unknown;
  emit?: unknown;
  slots?: object;
}

export interface IControllerData {
  props?: unknown;
  context: IControllerDataContext;
}

export const BeanControllerIdentifier = '$$c';
export const BeanRenderIdentifier = '$$r';
export const BeanStyleIdentifier = '$$s';

export function getBeanName<K extends keyof IBeanRecord>(beanFullName: K): K {
  return beanFullName;
}
