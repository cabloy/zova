import { ComputedRef, Ref } from 'vue';
import { Functionable } from '../decorator/type/functionable.js';

export type ExtractHook<Hook> = {
  [Prop in keyof Hook]: Hook[Prop] extends Ref<infer RawType>
    ? RawType
    : Hook[Prop] extends ComputedRef<infer RawType>
      ? RawType
      : Hook[Prop] extends Functionable
        ? Hook[Prop]
        : Hook[Prop] extends object
          ? ExtractHook<Hook[Prop]>
          : Hook[Prop];
};

export type ReturnTypeComposable<Hook extends Functionable> = Hook extends (...args: any[]) => infer R
  ? ExtractHook<R>
  : any;

export function useComposable<T extends Functionable>(hook: T, ...args: Parameters<T>): ReturnTypeComposable<T> {
  return hook(...args) as ReturnTypeComposable<T>;
}
