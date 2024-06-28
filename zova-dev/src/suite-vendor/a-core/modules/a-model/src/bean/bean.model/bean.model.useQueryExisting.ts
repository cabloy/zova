import {
  DefaultError,
  QueryKey,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  hashKey,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../../common/types.js';
import { BeanModelUseQuery } from './bean.model.useQuery.js';

const SymbolUseQueries = Symbol('SymbolUseQueries');

export class BeanModelUseQueryExisting<TScopeModule = unknown> extends BeanModelUseQuery<TScopeModule> {
  private [SymbolUseQueries]: Record<string, unknown> = {};

  protected async __init__() {}

  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryExisting(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      this[SymbolUseQueries][queryHash] = this.$useQuery(options, queryClient);
    }
    return this[SymbolUseQueries][queryHash];
  }

  $useQueryLocalExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocalExisting(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      this[SymbolUseQueries][queryHash] = this.$useQueryLocal(options, queryClient);
    }
    return this[SymbolUseQueries][queryHash];
  }

  $useQueryCookieExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookieExisting(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      this[SymbolUseQueries][queryHash] = this.$useQueryCookie(options, queryClient);
    }
    return this[SymbolUseQueries][queryHash];
  }

  $useQueryMemExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMemExisting(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      this[SymbolUseQueries][queryHash] = this.$useQueryMem(options, queryClient);
    }
    return this[SymbolUseQueries][queryHash];
  }
}