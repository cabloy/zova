import {
  DefaultError,
  MutationKey,
  MutationObserverOptions,
  QueryClient,
  UseMutationReturnType,
  hashKey,
  useMutation,
} from '@tanstack/vue-query';
import { MaybeRefDeep } from '../../common/types.js';
import { UnwrapNestedRefs } from 'vue';
import { Cast } from 'zova';
import { BeanModelUseQuery } from './bean.model.useQuery.js';

const SymbolUseMutations = Symbol('SymbolUseMutations');

export class BeanModelUseMutation<TScopeModule = unknown> extends BeanModelUseQuery<TScopeModule> {
  private [SymbolUseMutations]: Record<string, unknown> = {};

  $useMutation<TData = unknown, TVariables = void, TContext = unknown>(
    mutationOptions: MaybeRefDeep<MutationObserverOptions<TData, DefaultError, TVariables, TContext>>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseMutationReturnType<TData, DefaultError, TVariables, TContext>> {
    return this.ctx.meta.util.instanceScope(() => {
      return useMutation(mutationOptions, queryClient) as any;
    });
  }

  $useMutationExisting<TData = unknown, TVariables = void, TContext = unknown>(
    mutationOptions: MaybeRefDeep<MutationObserverOptions<TData, DefaultError, TVariables, TContext>>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseMutationReturnType<TData, DefaultError, TVariables, TContext>> {
    let mutationKey: MutationKey = Cast(mutationOptions).mutationKey;
    if (!mutationKey || mutationKey.length === 0) throw new Error('should specify mutationKey');
    mutationKey = this.self._forceQueryKeyPrefix(mutationKey);
    const mutationHash = hashKey(mutationKey);
    if (!this[SymbolUseMutations][mutationHash]) {
      mutationOptions = { ...mutationOptions, mutationKey };
      this[SymbolUseMutations][mutationHash] = this.$useMutation(mutationOptions, queryClient);
    }
    return this[SymbolUseMutations][mutationHash] as UnwrapNestedRefs<
      UseMutationReturnType<TData, DefaultError, TVariables, TContext>
    >;
  }
}
