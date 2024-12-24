export type TypeModuleComponents<T> = T;

export interface IComponentRecord {}

export type TypeComponentRecordSelector<PREFIX extends string> = {
  [K in keyof IComponentRecord as K extends `${string}:${PREFIX}${string}` ? K : never]: IComponentRecord[K];
};
export type TypeComponentRecordSelectorKeys<PREFIX extends string> = keyof TypeComponentRecordSelector<PREFIX>;

export type TypeComponentLayoutRecord = TypeComponentRecordSelector<'layout'>;
