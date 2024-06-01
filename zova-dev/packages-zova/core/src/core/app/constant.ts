import { PowerPartial } from '../../index.js';

export const constantDefault = {
  modules: {},
};

export type ZovaConstant = {
  modules: Record<string, object>;
} & typeof constantDefault;

export type ZovaConstantOptional = PowerPartial<ZovaConstant>;
