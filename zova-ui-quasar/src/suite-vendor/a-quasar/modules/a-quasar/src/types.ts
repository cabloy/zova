import { ReturnTypeComposable } from 'zova';
import useQuasar from 'quasar/src/composables/use-quasar/use-quasar.js';

import 'zova';
declare module 'zova' {
  export interface BeanBase {
    $q: ReturnTypeComposable<typeof useQuasar>;
  }
}
