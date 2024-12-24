import { style } from 'typestyle';
import 'zova';
import { BeanTheme } from './bean/bean.theme.js';
import { IBeanRecord } from 'zova';
declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
    $theme: BeanTheme;
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

export interface IThemeHandler {
  apply(result: IThemeHandlerApplyParams): Promise<void>;
}

export interface IThemeHandlerApplyParams {
  name: string;
  dark: boolean;
}
