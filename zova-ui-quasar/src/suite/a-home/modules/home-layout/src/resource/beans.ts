export * from '../bean/model.layout.js';
export * from '../bean/model.menu.js';
import { ModelMenu } from '../bean/model.menu.js';
import { ModelLayout } from '../bean/model.layout.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.model.menu': ModelMenu;
    'home-layout.model.layout': ModelLayout;
  }
}
