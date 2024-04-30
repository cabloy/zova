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

export type ReturnTypeHook<Hook extends Functionable> = Hook extends (...args: any[]) => infer R ? ExtractHook<R> : any;

export function useHook<T extends Functionable>(hook: T, ...args: Parameters<T>): ReturnTypeHook<T> {
  return hook(...args) as ReturnTypeHook<T>;
}
