import { ReturnTypeHook } from '@cabloy/front-core';
import { useQuasar } from 'quasar';

declare module '@cabloy/front-core' {
  export interface BeanBase {
    $q: ReturnTypeHook<typeof useQuasar>;
  }
}
