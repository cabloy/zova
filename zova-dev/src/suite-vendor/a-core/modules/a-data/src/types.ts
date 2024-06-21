import 'zova';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
declare module 'zova' {
  export interface BeanBase {
    $queryClient: ReturnType<typeof useQueryClient>;
  }
}

declare module '@tanstack/vue-query' {
  export interface QueryMeta {
    dehydrate: boolean;
  }
}

export interface StoreConfigPersist {
  storage?: 'cookie' | 'local' | 'db';
}

export interface StoreConfig {
  persist?: StoreConfigPersist | boolean;
}

export type DataQuery<TData> = UnwrapNestedRefs<ReturnType<typeof useQuery<TData>>>;
