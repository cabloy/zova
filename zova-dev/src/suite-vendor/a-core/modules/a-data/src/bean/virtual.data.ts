import {
  DefaultError,
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  QueryFilters,
  Query,
  DataTag,
  Updater,
  SetDataOptions,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { BeanBase, Cast, SymbolBeanFullName, Virtual, useComputed } from 'zova';
import { DefinedInitialQueryOptions, MaybeRefDeep, NoUnknown, UndefinedInitialQueryOptions } from '../common/types.js';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';
import { QueryMetaPersister } from '../types.js';
import { cookieStorage } from '../common/cookieStorage.js';
import localforage from 'localforage';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { BeanDataFirst } from './bean.data/bean.data.first.js';

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanDataFirst<TScopeModule> {
  $setQueryData<
    TQueryFnData,
    TTaggedQueryKey extends QueryKey,
    TData = TTaggedQueryKey extends DataTag<unknown, infer TaggedValue> ? TaggedValue : TQueryFnData,
  >(
    queryKey: TTaggedQueryKey,
    updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>,
    persisterSave?: boolean,
    options?: MaybeRefDeep<SetDataOptions>,
  ): TData | undefined;
  $setQueryData<TQueryFnData, TData = NoUnknown<TQueryFnData>>(
    queryKey: MaybeRefDeep<QueryKey>,
    updater: Updater<NoInfer<TData> | undefined, NoInfer<TData> | undefined>,
    persisterSave?: boolean,
    options?: MaybeRefDeep<SetDataOptions>,
  ): TData | undefined;
  $setQueryData(queryKey, updater, persisterSave, options) {
    queryKey = this._forceQueryKeyPrefix(queryKey);
    const data = this.$queryClient.setQueryData(queryKey, updater, options);
    if (persisterSave) {
      this.$persisterSave(queryKey);
    }
    return data;
  }

  $queryFind<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    filters: QueryFilters,
  ): Query<TQueryFnData, TError, TData> | undefined {
    filters = { ...filters };
    Cast(filters).queryKey = this._forceQueryKeyPrefix(Cast(filters).queryKey);
    return this.$queryClient.getQueryCache().find(filters as any);
  }

  $serializeCookie(obj?: Query) {
    return String(obj?.state?.data ?? '');
  }

  $deserializeCookie(value?: string) {
    return {
      state: {
        data: value,
        dataUpdateCount: 0,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: 'success',
        fetchStatus: 'idle',
      },
      queryKey: undefined,
      queryHash: undefined,
      buster: this._getPersisterBuster(),
    };
  }
}
