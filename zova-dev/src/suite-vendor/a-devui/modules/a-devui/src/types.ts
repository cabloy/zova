import 'zova';
import { ThemeToken } from './token.js';
declare module 'zova' {
  export interface BeanBase {
    $token: ThemeToken;
  }
}
