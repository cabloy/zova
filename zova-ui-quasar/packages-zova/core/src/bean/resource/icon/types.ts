import { IconGroup } from './iconGroup.js';

export interface IIconRecord {}
export type TypeIcon = keyof IIconRecord;

export interface IIconMeta {
  module: string;
  group: string;
  name: string;
  fullName: string;
  symbolId: string;
}

export interface IIconInfo {
  meta: IIconMeta;
  symbolId: string; // '' or valid icon
}

export type TypeIconGroups = Record<string, IconGroup>;
export type TypeIconModules = Record<string, TypeIconGroups>;
export type TypeIconSymbols = Record<string, string>;
