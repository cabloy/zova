import { PowerPartial } from '../../index.js';

export const constantDefault = {
  modules: {},
};

export type CabloyConstant = {
  modules: Record<string, object>;
} & typeof constantDefault;

export type CabloyConstantOptional = PowerPartial<CabloyConstant>;
