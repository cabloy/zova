import {
  DataTag,
  DefaultError,
  InvalidateOptions,
  InvalidateQueryFilters,
  Query,
  QueryFilters,
  QueryKey,
  SetDataOptions,
  Updater,
} from '@tanstack/vue-query';
import localforage from 'localforage';
import { MaybeRefDeep, NoUnknown } from '../../common/types.js';
import { Cast } from 'zova';
import { BeanModelCookie } from './bean.model.cookie.js';

export class BeanModelQuery<TScopeModule = unknown> extends BeanModelCookie<TScopeModule> {
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
    if (data === undefined) {
      if (persisterSave) {
        this.$persisterRemove(queryKey);
      }
      this.$setQueryDataDirect(queryKey, data);
    } else {
      if (persisterSave) {
        this.$persisterSave(queryKey);
      }
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

  $invalidateQueries(
    filters?: MaybeRefDeep<InvalidateQueryFilters>,
    options?: MaybeRefDeep<InvalidateOptions>,
  ): Promise<void> {
    if (!filters) filters = {};
    const queryKey = this._forceQueryKeyPrefix(Cast(filters).queryKey);
    filters = { ...filters, queryKey };
    return this.$queryClient.invalidateQueries(filters, options);
  }

  $setQueryDataDirect(queryKey: QueryKey, value: any) {
    const query = this.$queryFind({ queryKey, exact: true });
    query?.setData(value);
  }

  async $clear() {
    const queries = this.$queryClient.getQueryCache().getAll();
    for (const query of queries) {
      query?.setData(undefined);
    }
    // remove all db cache
    await localforage.clear();
  }
}
