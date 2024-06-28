export * from '../bean/data.menu.js';
import { ModelMenu } from '../bean/data.menu.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.model.menu': ModelMenu;
  }
}
