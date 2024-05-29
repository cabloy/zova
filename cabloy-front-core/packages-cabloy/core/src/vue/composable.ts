import { ComputedRef, Ref } from 'vue';
import { Functionable } from '../decorator/type/functionable.js';

export type ExtractComposable<Composable> = {
  [Prop in keyof Composable]: Composable[Prop] extends Ref<infer RawType>
    ? RawType
    : Composable[Prop] extends ComputedRef<infer RawType>
      ? RawType
      : Composable[Prop] extends Functionable
        ? Composable[Prop]
        : Composable[Prop] extends object
          ? ExtractComposable<Composable[Prop]>
          : Composable[Prop];
};

export type ReturnTypeComposable<Composable extends Functionable> = Composable extends (...args: any[]) => infer R
  ? ExtractComposable<R>
  : any;

export function useComposable<T extends Functionable>(composable: T, ...args: Parameters<T>): ReturnTypeComposable<T> {
  return composable(...args) as ReturnTypeComposable<T>;
}
