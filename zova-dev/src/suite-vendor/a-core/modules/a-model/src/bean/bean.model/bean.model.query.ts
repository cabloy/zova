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
import { MaybeRefDeep, NoUnknown } from '../../common/types.js';
import { Cast } from 'zova';
import { BeanDataCookie } from './bean.model.cookie.js';

export class BeanModelQuery<TScopeModule = unknown> extends BeanDataCookie<TScopeModule> {
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

  $invalidateQueries(
    filters?: MaybeRefDeep<InvalidateQueryFilters>,
    options?: MaybeRefDeep<InvalidateOptions>,
  ): Promise<void> {
    if (!filters) filters = {};
    const queryKey = this._forceQueryKeyPrefix(Cast(filters).queryKey);
    filters = { ...filters, queryKey };
    return this.$queryClient.invalidateQueries(filters, options);
  }
}
