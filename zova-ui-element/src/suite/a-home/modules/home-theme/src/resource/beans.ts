export * from '../bean/theme.default.js';
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-theme.theme.default': ThemeDefault;
  }
}
