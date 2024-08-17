import 'zova';
import { DefaultError, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
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

export type { UseQueryOptions } from '@tanstack/vue-query';

export interface MyQueryMeta extends Record<string, unknown> {
  defaultData?: (() => any) | any;
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
  cookieType?: 'auto' | 'number' | 'date' | 'string' | undefined;
}

export type DataQuery<TData> = UnwrapNestedRefs<ReturnType<typeof useQuery<TData | undefined, Error | null>>>;

export type DataMutation<TData = unknown, TVariables = void, TContext = unknown> = UnwrapNestedRefs<
  ReturnType<typeof useMutation<TData, DefaultError, TVariables, TContext>>
>;
