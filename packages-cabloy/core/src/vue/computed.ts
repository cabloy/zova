import { computed, ComputedGetter, DebuggerOptions, WritableComputedOptions } from '@vue/reactivity';

export function useComputed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): T;
export function useComputed<T>(options: WritableComputedOptions<T>, debugOptions?: DebuggerOptions): T;
export function useComputed(options, debugOptions) {
  return computed(options, debugOptions);
}
