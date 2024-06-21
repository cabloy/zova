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
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { BeanBase, Cast, SymbolBeanFullName, Virtual } from 'zova';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../common/types.js';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';
import { QueryMetaPersister } from '../types.js';
import { cookieStorage } from '../common/cookieStorage.js';
import localforage from 'localforage';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  scopeSelf: ScopeModule;

  protected async __init__() {
    this.scopeSelf = this.getScope(__ThisModule__);
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
  $useQuery(params) {
    params = { ...params };
    params.queryKey = this._forceQueryKeyPrefix(params.queryKey);
    params.persister = this._createPersister(params.meta?.persister);
    return this.ctx.meta.util.instanceScope(() => {
      return useQuery(params);
    });
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
      buster: this.app.config.env.appVersion,
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
      maxAge: options.maxAge ?? this.scopeSelf.config.persister.maxAge,
      prefix: this._getPersisterPrefix(),
      // serialize: data => {
      //   return JSON.stringify(data);
      // },
    });
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

  private _forceQueryKeyPrefix(queryKey: QueryKey): QueryKey {
    if (!queryKey) return queryKey;
    const prefix = queryKey[0];
    if (prefix && typeof prefix === 'string' && prefix.split('.').length === 3) return queryKey;
    return [this[SymbolBeanFullName]].concat(queryKey as any);
  }
}
