//import { persistQueryClientSave } from '@tanstack/query-persist-client-core';
import {
  DefaultError,
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { BeanBase, SymbolBeanFullName, Virtual } from 'zova';

type NonUndefinedGuard<T> = T extends undefined ? never : T;

type UndefinedInitialQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey> & {
  initialData?: undefined;
};
type DefinedInitialQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey> & {
  initialData: NonUndefinedGuard<TQueryFnData> | (() => NonUndefinedGuard<TQueryFnData>);
};

@Virtual()
export class BeanDataBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
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
    params.queryKey = this._forcePrefix(params.queryKey);
    return this.ctx.meta.util.instanceScope(() => {
      const data = useQuery(params);
      window.setTimeout(() => {
        this.$queryClient.setQueryData(params.queryKey, 500);
        const query = this.$queryClient.getQueryCache().find({ queryKey: params.queryKey })!;
        const prefix = `${this.app.config.env.appName}-query`;
        const storageKey = `${prefix}-${query.queryHash}`;
        // Persist if we have storage defined, we use timeout to get proper state to be persisted
        setTimeout(async () => {
          localStorage.setItem(
            storageKey,
            await JSON.stringify({
              state: query.state,
              queryKey: query.queryKey,
              queryHash: query.queryHash,
              buster: '',
            }),
          );
        }, 0);
      }, 2000);
      return data;
    });
  }

  private _forcePrefix(queryKey: QueryKey): QueryKey {
    const prefix = queryKey[0];
    if (prefix && typeof prefix === 'string' && prefix.split('.').length === 3) return queryKey;
    return [this[SymbolBeanFullName]].concat(queryKey as any);
  }
}
