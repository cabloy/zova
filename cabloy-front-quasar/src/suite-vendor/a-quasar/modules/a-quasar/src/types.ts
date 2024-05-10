import { ReturnTypeHook } from '@cabloy/front';
import { useQuasar } from 'quasar';

declare module '@cabloy/front' {
  export interface BeanBase {
    $q: ReturnTypeHook<typeof useQuasar>;
  }
}
