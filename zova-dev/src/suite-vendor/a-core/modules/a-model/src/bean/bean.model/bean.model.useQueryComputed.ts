import {
  DefaultError,
  QueryKey,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../../common/types.js';
import { BeanModelUseQueryExisting } from './bean.model.useQueryExisting.js';
import { useComputed } from 'zova';

export class BeanModelUseQueryComputed<TScopeModule = unknown> extends BeanModelUseQueryExisting<TScopeModule> {
  $useQueryComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQueryComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryComputed(options, queryClient) {
    return useComputed(() => {
      return this.$useQueryExisting(options, queryClient);
    });
  }

  $useQueryLocalComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalComputed(options, queryClient) {
    return useComputed({
      get: () => {
        return this.$useQueryLocalExisting(options, queryClient);
      },
      set: value => {
        const res = {
          query: this.$useQueryLocalExisting(options, queryClient),
        };
        Reflect.set(res, 'query', value);
        return res;
      },
    });
  }

  $useQueryCookieComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieComputed(options, queryClient) {
    return useComputed({
      get: () => {
        return this.$useQueryCookieExisting(options, queryClient);
      },
      set: value => {
        const res = {
          query: this.$useQueryCookieExisting(options, queryClient),
        };
        Reflect.set(res, 'query', value);
        return res;
      },
    });
  }

  $useQueryMemComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemComputed<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemComputed(options, queryClient) {
    return useComputed({
      get: () => {
        return this.$useQueryMemExisting(options, queryClient);
      },
      set: value => {
        const res = {
          query: this.$useQueryMemExisting(options, queryClient),
        };
        Reflect.set(res, 'query', value);
        return res;
      },
    });
  }
}
