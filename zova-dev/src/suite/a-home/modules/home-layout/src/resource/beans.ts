export * from '../bean/data.layout.js';
import { DataLayout } from '../bean/data.layout.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-layout.data.layout': DataLayout;
  }
}
