import {
  DefaultError,
  MutationObserverOptions,
  QueryClient,
  UseMutationReturnType,
  useMutation,
} from '@tanstack/vue-query';
import { BeanDataUseQuery } from './bean.model.useQuery.js';
import { MaybeRefDeep } from '../../common/types.js';
import { UnwrapNestedRefs } from 'vue';

export class BeanDataUseMutation<TScopeModule = unknown> extends BeanDataUseQuery<TScopeModule> {
  $useMutation<TData = unknown, TVariables = void, TContext = unknown>(
    mutationOptions: MaybeRefDeep<MutationObserverOptions<TData, DefaultError, TVariables, TContext>>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseMutationReturnType<TData, DefaultError, TVariables, TContext>> {
    return this.ctx.meta.util.instanceScope(() => {
      return useMutation(mutationOptions, queryClient) as any;
    });
  }
}
