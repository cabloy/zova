import { ReturnTypeComposable } from 'zova';

import 'zova';
import { useQueryClient } from '@tanstack/vue-query';
declare module 'zova' {
  export interface BeanBase {
    $queryClient: ReturnTypeComposable<typeof useQueryClient>;
  }
}

export interface StoreConfigPersist {
  storage?: 'cookie' | 'local' | 'db';
}

export interface StoreConfig {
  persist?: StoreConfigPersist | boolean;
}
