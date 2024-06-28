export * from '../bean/model.userInfo.js';
import { ModelUserInfo } from '../bean/model.userInfo.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.userInfo': ModelUserInfo;
  }
}
