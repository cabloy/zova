import { IBeanScopeLocale, PowerPartial } from '../../index.js';

export const localeDefault = {
  modules: {},
};

export type CabloyLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type CabloyLocaleOptional = PowerPartial<CabloyLocale>;
export type CabloyLocaleOptionalMap = Record<string, CabloyLocaleOptional>;
