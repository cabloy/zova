import { ThemeToken } from 'zova-module-a-devui';
import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  export interface ThemeApplyResult {
    token: ThemeToken;
  }
}
