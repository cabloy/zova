import { UnwrapNestedRefs } from 'vue';
import { Functionable } from '../decorator/type/functionable.js';

export type ExtractComposable<Composable> = UnwrapNestedRefs<Composable>;

export type ReturnTypeComposable<Composable extends Functionable> = Composable extends (...args: any[]) => infer R
  ? ExtractComposable<R>
  : any;

export function useComposable<T extends Functionable>(composable: T, ...args: Parameters<T>): ReturnTypeComposable<T> {
  return composable(...args) as ReturnTypeComposable<T>;
}
