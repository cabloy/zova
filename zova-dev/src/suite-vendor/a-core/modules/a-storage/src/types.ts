import { ReturnTypeComposable } from 'zova';

import 'zova';
import { useQueryClient } from '@tanstack/vue-query';
declare module 'zova' {
  export interface BeanBase {
    $queryClient: ReturnTypeComposable<typeof useQueryClient>;
  }
}
