export * from '../bean/model.user.js';
import { ModelUser } from '../bean/model.user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.user': ModelUser;
  }
}
