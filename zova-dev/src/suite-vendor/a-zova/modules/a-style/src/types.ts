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

export interface IThemeApplyParams {
  name: string;
  dark: boolean;
}

export interface IThemeApplyResult {
  handler?: keyof IBeanRecord;
}

export interface IThemeBase {
  apply({ name, dark }: IThemeApplyParams): Promise<IThemeApplyResult>;
}

export interface IThemeHandler {
  apply(result: IThemeHandlerApplyParams): Promise<void>;
}

export interface IThemeHandlerApplyParams {
  name: string;
  dark: boolean;
}
