export * from '../bean/style.default.js';
import { StyleDefault } from '../bean/style.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-style.style.default': StyleDefault;
  }
}
