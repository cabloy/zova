export * from '../bean/model.tabs.js';
import { ModelTabs } from '../bean/model.tabs.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-tabs.model.tabs': ModelTabs;
  }
}
