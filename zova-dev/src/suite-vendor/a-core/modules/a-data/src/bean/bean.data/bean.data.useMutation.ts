import {
  DefaultError,
  MutationObserverOptions,
  QueryClient,
  UseMutationReturnType,
  useMutation,
} from '@tanstack/vue-query';
import { BeanDataUseQuery } from './bean.data.useQuery.js';
import { MaybeRefDeep } from '../../common/types.js';
import { UnwrapNestedRefs } from 'vue';

export class BeanDataUseMutation<TScopeModule = unknown> extends BeanDataUseQuery<TScopeModule> {
  $useMutation<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
    mutationOptions: MaybeRefDeep<MutationObserverOptions<TData, TError, TVariables, TContext>>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseMutationReturnType<TData, TError, TVariables, TContext>> {
    useMutation();
  }
}
