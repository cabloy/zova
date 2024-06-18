export * from '../bean/store.userInfo.js';
import { StoreUserInfo } from '../bean/store.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.store.userInfo': StoreUserInfo;
  }
}
