export * from '../bean/data.userInfo.js';
import { DataUserInfo } from '../bean/data.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.data.userInfo': DataUserInfo;
  }
}
