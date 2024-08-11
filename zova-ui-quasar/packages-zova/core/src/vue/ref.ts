import { Ref, UnwrapRef, toRef } from 'vue';

export function useRef<T>(value: T): T extends () => infer R ? R : T extends Ref ? UnwrapRef<T> : UnwrapRef<T>;
export function useRef<T extends object, K extends keyof T>(object: T, key: K): T[K];
export function useRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: T[K],
): Exclude<T[K], undefined>;
export function useRef(object, key?, defaultValue?) {
  return toRef(object, key, defaultValue);
}
