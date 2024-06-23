import {
  DefaultError,
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  Query,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { useComputed } from 'zova';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../../common/types.js';
import { BeanDataPersister } from './bean.data.persister.js';

export class BeanDataUseQuery<TScopeModule = unknown> extends BeanDataPersister<TScopeModule> {
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery(options, queryClient) {
    options = { ...options };
    options.queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    options.persister = this._createPersister(options.meta?.persister);
    return this.ctx.meta.util.instanceScope(() => {
      return useQuery(options, queryClient);
    });
  }

  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal(options, queryClient) {
    options = this.app.meta.util.extend({}, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: { storage: 'local', sync: true },
      },
    });
    const queryKey = options.queryKey;
    const self = this;
    return useComputed({
      get() {
        const query = self.$useQuery(options, queryClient) as any;
        if (query.data.value === undefined) {
          const data = self.$persisterLoad(queryKey);
          if (data !== undefined) {
            self.$setQueryData(queryKey, data);
          }
        }
        return query.data;
      },
      set(value) {
        self.$setQueryData(queryKey, value, true);
      },
    });
  }

  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie(options, queryClient) {
    options = this.app.meta.util.extend(
      {
        meta: {
          persister: {
            serialize: (obj?: Query) => {
              return this.$serializeCookie(obj);
            },
            deserialize: (value?: string) => {
              return this.$deserializeCookie(value);
            },
          },
        },
      },
      options,
      {
        enabled: false,
        staleTime: Infinity,
        meta: {
          persister: { storage: 'cookie', sync: true },
        },
      },
    );
    const queryKey = options.queryKey;
    const self = this;
    return useComputed({
      get() {
        const query = self.$useQuery(options, queryClient) as any;
        if (query.data.value === undefined) {
          const data = self.$persisterLoad(queryKey);
          if (data !== undefined) {
            self.$setQueryData(queryKey, data);
          }
        }
        return query.data;
      },
      set(value) {
        self.$setQueryData(queryKey, value, true);
      },
    });
  }

  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem(options, queryClient) {
    options = this.app.meta.util.extend({}, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: false,
      },
    });
    const queryKey = options.queryKey;
    const self = this;
    return useComputed({
      get() {
        const query = self.$useQuery(options, queryClient) as any;
        return query.data;
      },
      set(value) {
        self.$setQueryData(queryKey, value, false);
      },
    });
  }
}
