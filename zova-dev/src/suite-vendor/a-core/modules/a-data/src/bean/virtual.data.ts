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
import { BeanBase, Cast, SymbolBeanFullName, Virtual, useCustomRef } from 'zova';
import { DefinedInitialQueryOptions, MaybeRefDeep, NoUnknown, UndefinedInitialQueryOptions } from '../common/types.js';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';
import { QueryMetaPersister } from '../types.js';
import { cookieStorage } from '../common/cookieStorage.js';
import localforage from 'localforage';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  get scopeSelf(): ScopeModule {
    return this.getScope(__ThisModule__);
  }

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
    options.queryKey = this._forceQueryKeyPrefix(options.queryKey);
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
    options = {
      ...options,
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: { storage: 'local', sync: true },
      },
    };
    const queryKey = options.queryKey;
    const self = this;
    return useCustomRef((track, trigger) => {
      return {
        get() {
          track();
          const query = self.$useQuery(options, queryClient) as any;
          if (query.data.value === undefined) {
            const data = self.$persisterLoad(queryKey);
            if (data !== undefined) {
              self.$setQueryData(queryKey, data);
            }
          }
          return query.data;
        },
        set(newValue) {
          self.$setQueryData(queryKey, newValue, true);
          trigger();
        },
      };
    });
  }

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

  $persisterLoad<T>(queryKey: QueryKey): T | undefined {
    const query = this.$queryFind({ queryKey });
    if (!query) return undefined;
    const prefix = this._getPersisterPrefix();
    const storageKey = `${prefix}-${query.queryHash}`;
    let options = query.meta?.persister;
    if (options === false) return undefined;
    if (options === undefined || options === true) options = {};
    const storage = this._getPersisterStorage(options);
    if (!storage) return undefined;
    try {
      const storedData = storage.getItem(storageKey);
      if (!storedData) return undefined;
      const persistedQuery = JSON.parse(storedData as string);

      if (persistedQuery.state.dataUpdatedAt) {
        const queryAge = Date.now() - persistedQuery.state.dataUpdatedAt;
        const expired = queryAge > this._getPersisterMaxAge(options.maxAge);
        const busted = persistedQuery.buster !== this._getPersisterBuster();
        if (expired || busted) {
          storage.removeItem(storageKey);
        } else {
          // Set proper updatedAt, since resolving in the first pass overrides those values
          query.setState({
            dataUpdatedAt: persistedQuery.state.dataUpdatedAt,
            errorUpdatedAt: persistedQuery.state.errorUpdatedAt,
          });
          return persistedQuery.state.data as T;
        }
      } else {
        storage.removeItem(storageKey);
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
        console.warn('Encountered an error attempting to restore query cache from persisted location.');
      }
      storage.removeItem(storageKey);
    }
  }

  $persisterSave(queryKey: QueryKey) {
    const query = this.$queryFind({ queryKey });
    if (!query) return;
    const prefix = this._getPersisterPrefix();
    const storageKey = `${prefix}-${query.queryHash}`;
    let options = query.meta?.persister;
    if (options === false) return;
    if (options === undefined || options === true) options = {};
    const storage = this._getPersisterStorage(options);
    if (!storage) return;
    const data = JSON.stringify({
      state: query.state,
      queryKey: query.queryKey,
      queryHash: query.queryHash,
      buster: this._getPersisterBuster(),
    });
    if (options.sync === true) {
      storage.setItem(storageKey, data);
    } else {
      // Persist if we have storage defined, we use timeout to get proper state to be persisted
      setTimeout(() => {
        storage.setItem(storageKey, data);
      }, 0);
    }
  }

  $queryFind<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    filters: QueryFilters,
  ): Query<TQueryFnData, TError, TData> | undefined {
    filters = { ...filters };
    Cast(filters).queryKey = this._forceQueryKeyPrefix(Cast(filters).queryKey);
    return this.$queryClient.getQueryCache().find(filters as any);
  }

  private _createPersister(options?: QueryMetaPersister | boolean) {
    if (options === false) return undefined;
    if (options === undefined || options === true) options = {};
    return experimental_createPersister({
      storage: this._getPersisterStorage(options) as any,
      maxAge: this._getPersisterMaxAge(options.maxAge),
      prefix: this._getPersisterPrefix(),
      // serialize: data => {
      //   return JSON.stringify(data);
      // },
    });
  }

  private _getPersisterMaxAge(maxAge?: number) {
    return maxAge ?? this.scopeSelf.config.persister.maxAge;
  }

  private _getPersisterStorage(options?: QueryMetaPersister | boolean) {
    if (options === false) return undefined;
    if (options === undefined || options === true) options = {};
    const storage = options.storage ?? (options.sync ? 'local' : 'db');
    if (storage === 'cookie') return cookieStorage;
    if (storage === 'local') return localStorage;
    if (storage === 'db') return localforage;
  }

  private _getPersisterPrefix() {
    return `${this.app.config.env.appName}-query`;
  }

  private _getPersisterBuster() {
    return this.app.config.env.appVersion;
  }

  private _forceQueryKeyPrefix(queryKey: QueryKey): QueryKey {
    if (!queryKey) return queryKey;
    const prefix = queryKey[0];
    if (prefix && typeof prefix === 'string' && prefix.split('.').length === 3) return queryKey;
    return [this[SymbolBeanFullName]].concat(queryKey as any);
  }
}
