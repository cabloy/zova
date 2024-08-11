import { IBeanScopeLocale, PowerPartial } from '../../index.js';

export const localeDefault = {
  modules: {},
};

export type ZovaLocale = {
  modules: IBeanScopeLocale;
} & typeof localeDefault;

export type ZovaLocaleOptional = PowerPartial<ZovaLocale>;
export type ZovaLocaleOptionalMap = Record<string, ZovaLocaleOptional>;
