import { style } from 'typestyle';
import 'zova';
import { StoreTheme } from './bean/store.theme.js';
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

export interface ThemeApplyResult {}

export interface ThemeBase {
  apply({ name, dark }: ThemeApplyParams): Promise<ThemeApplyResult>;
}
