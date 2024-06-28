export * from '../bean/data.userInfo.js';
import { ModelUserInfo } from '../bean/data.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.userInfo': ModelUserInfo;
  }
}
