import { ReturnTypeComposable } from '@cabloy/front';
import useQuasar from 'quasar/src/composables/use-quasar/use-quasar.js';

import '@cabloy/front';
declare module '@cabloy/front' {
  export interface BeanBase {
    $q: ReturnTypeComposable<typeof useQuasar>;
  }
}
