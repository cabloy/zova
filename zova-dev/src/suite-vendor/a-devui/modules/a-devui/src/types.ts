import 'zova';
import { token } from './token.js';
declare module 'zova' {
  export interface BeanBase {
    $token: typeof token;
  }
}
