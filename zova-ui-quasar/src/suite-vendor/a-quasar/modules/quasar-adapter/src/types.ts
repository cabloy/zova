import { UnwrapNestedRefs } from 'vue';
import { QVueGlobals } from 'quasar';

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $q: UnwrapNestedRefs<QVueGlobals>;
  }
}
