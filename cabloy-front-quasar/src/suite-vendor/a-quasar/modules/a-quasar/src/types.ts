import { ReturnTypeHook } from '@cabloy/front';
import useQuasar from 'quasar/src/composables/use-quasar/use-quasar.js';

declare module '@cabloy/front' {
  export interface BeanBase {
    $q: ReturnTypeHook<typeof useQuasar>;
  }
}
