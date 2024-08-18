import 'zova';
import {
  DefaultError,
  DehydratedState,
  Query,
  QueryKey,
  StaleTime,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
declare module 'zova' {
  export interface BeanBase {
    $queryClient: ReturnType<typeof useQueryClient>;
  }

  export interface SSRContextState {
    query: DehydratedState;
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

export type QueryMetaPersisterCookieType = 'auto' | 'boolean' | 'number' | 'date' | 'string' | undefined;

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
  cookieType?: QueryMetaPersisterCookieType;
}

export type DataQuery<TData> = UnwrapNestedRefs<ReturnType<typeof useQuery<TData | undefined, Error | null>>>;

export type DataMutation<TData = unknown, TVariables = void, TContext = unknown> = UnwrapNestedRefs<
  ReturnType<typeof useMutation<TData, DefaultError, TVariables, TContext>>
>;

export function resolveStaleTime<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  staleTime: undefined | StaleTime<TQueryFnData, TError, TData, TQueryKey>,
  query: Query<TQueryFnData, TError, TData, TQueryKey>,
): number | undefined {
  return typeof staleTime === 'function' ? staleTime(query) : staleTime;
}
