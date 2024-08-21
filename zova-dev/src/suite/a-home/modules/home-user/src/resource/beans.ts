export * from '../bean/model.auth.js';
export * from '../bean/model.user.js';
import { ModelUser } from '../bean/model.user.js';
import { ModelAuth } from '../bean/model.auth.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.user': ModelUser;
    'home-user.model.auth': ModelAuth;
  }
}
