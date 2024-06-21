export * from '../bean/data.userInfo.js';
export * from '../bean/store.userInfo.js';
import { StoreUserInfo } from '../bean/store.userInfo.js';
import { DataUserInfo } from '../bean/data.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.store.userInfo': StoreUserInfo;
    'home-user.data.userInfo': DataUserInfo;
  }
}
