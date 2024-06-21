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
    ssr?: QueryMetaSSR;
    persister?: QueryMetaPersister | boolean;
  }
}

export interface QueryMetaSSR {
  /** default is true */
  dehydrate?: boolean;
}

export type QueryMetaPersisterStorage = 'cookie' | 'local' | 'db' | undefined;

export interface QueryMetaPersister {
  /** default is db if async, local if sync */
  storage?: QueryMetaPersisterStorage;
  /** default is 24 hours */
  maxAge?: number;
}

export type DataQuery<TData> = UnwrapNestedRefs<ReturnType<typeof useQuery<TData>>>;
