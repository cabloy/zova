import { ScopeModule } from './this.js';

declare module 'zova' {
  interface BeanBase {
    get scope(): ScopeModule;
  }
}
