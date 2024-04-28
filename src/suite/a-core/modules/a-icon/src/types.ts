import { IconGroup } from './common/iconGroup.js';

export interface IIconMeta {
  module: string;
  group: string;
  name: string;
  fullName: string;
  symbolId: string;
}

export interface IIconInfo {
  meta: IIconMeta;
  symbolId: string;
}

export type TypeIconGroups = Record<string, IconGroup>;
export type TypeIconModules = Record<string, TypeIconGroups>;
export type TypeIconSymbols = Record<string, string>;
