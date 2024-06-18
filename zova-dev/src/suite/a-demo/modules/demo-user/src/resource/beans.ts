export * from '../bean/store.userInfo.js';
import { StoreUserInfo } from '../bean/store.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-user.store.userInfo': StoreUserInfo;
  }
}
