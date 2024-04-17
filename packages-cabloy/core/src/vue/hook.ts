import { ComputedRef, Ref } from 'vue';

export type ExtractHook<Hook> = {
  [Prop in keyof Hook]: Hook[Prop] extends Ref<infer RawType>
    ? RawType
    : Hook[Prop] extends ComputedRef<infer RawType>
      ? RawType
      : Hook[Prop] extends object
        ? ExtractHook<Hook[Prop]>
        : Hook[Prop];
};

export type ReturnTypeHook<Hook extends (...args: any[]) => any> = Hook extends (...args: any[]) => infer R
  ? ExtractHook<R>
  : any;

export function useHook<T extends (...args: any[]) => any>(hook: T, ...args: Parameters<T>): ReturnTypeHook<T> {
  return hook(...args);
}
