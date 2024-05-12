/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecordKeys = keyof IBeanRecord;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IBeanScopeLocale {}
export type TypeBeanScopeLocaleKeys = keyof IBeanScopeLocale;

export interface IMotherDataContext {
  attrs?: unknown;
  emit?: unknown;
  slots?: object;
}

export interface IMotherData {
  props?: unknown;
  context?: IMotherDataContext;
}
