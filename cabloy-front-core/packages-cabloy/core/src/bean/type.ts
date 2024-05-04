/** bean merge: bean.instance */
export interface IBeanRecord {}
export type TypeBeanRecordKeys = keyof IBeanRecord;

export interface IBeanScopeRecord {}
export type TypeBeanScopeRecordKeys = keyof IBeanScopeRecord;

export interface IBeanScopeConfig {}
export type TypeBeanScopeConfigKeys = keyof IBeanScopeConfig;

export interface IMotherParams {
  props?: object;
  context?: { emit?: any };
}
