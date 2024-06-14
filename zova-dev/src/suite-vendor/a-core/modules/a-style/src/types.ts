import { style } from 'typestyle';
import 'zova';
import { StoreTheme } from './bean/store.theme.js';
import { IBeanRecord } from 'zova';
declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
    $theme: StoreTheme;
  }
}

export interface ThemeApplyParams {
  name: string;
  dark: boolean;
}

export interface ThemeApplyResult {
  handler?: keyof IBeanRecord;
}

export interface ThemeBase {
  apply({ name, dark }: ThemeApplyParams): Promise<ThemeApplyResult>;
}

export interface ThemeHandler {
  apply(result: ThemeHandlerApplyParams): Promise<void>;
}

export interface ThemeHandlerApplyParams {
  name: string;
  dark: boolean;
}
