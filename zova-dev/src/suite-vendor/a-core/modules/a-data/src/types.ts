import 'zova';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
declare module 'zova' {
  export interface BeanBase {
    $queryClient: ReturnType<typeof useQueryClient>;
  }
}

declare module '@tanstack/vue-query' {
  export interface Register {
    queryMeta: MyQueryMeta;
    mutationMeta: MyQueryMeta;
  }
}

export interface MyQueryMeta extends Record<string, unknown> {
  ssr?: QueryMetaSSR;
  persister?: QueryMetaPersister | boolean;
}

export interface QueryMetaSSR {
  /** default is true */
  dehydrate?: boolean;
}

export type QueryMetaPersisterStorage = 'cookie' | 'local' | 'db' | undefined;

export interface QueryMetaPersister {
  /** default is false */
  sync?: boolean;
  /** default is db if async, local if sync */
  storage?: QueryMetaPersisterStorage;
  /** default is 24 hours */
  maxAge?: number;
  /**
   * How to serialize the data to storage.
   * @default `JSON.stringify`
   */
  serialize?: (persistedQuery: any) => any;
  /**
   * How to deserialize the data from storage.
   * @default `JSON.parse`
   */
  deserialize?: (cachedString: any) => any;
  prefix?: string;
  buster?: string;
}

export type DataQuery<TData> = UnwrapNestedRefs<ReturnType<typeof useQuery<TData>>>;
