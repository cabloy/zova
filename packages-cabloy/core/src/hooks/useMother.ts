import { getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, useAttrs, useSlots } from 'vue';
import { queuePostFlushCb } from '@cabloy/vue-runtime-core';
import { Constructable } from '../decorator/index.js';
import { CabloyContext } from '../core/context/index.js';
import { IBeanRecord } from '../bean/type.js';

export function useMother<T>(A: Constructable<T>, props?, emit?);
export function useMother<K extends keyof IBeanRecord>(beanFullName: K, props?, emit?);
export function useMother(beanFullName: string, props?, emit?);
export function useMother<T>(beanFullName: Constructable<T> | string, props?, emit?) {
  // ctx
  const ctx = new CabloyContext(getCurrentInstance()!);
  // attrs
  const attrs = useAttrs();
  // slots
  const slots = useSlots();
  // mother
  onMounted(async () => {
    await ctx.bean._newBeanInner(
      true,
      '$$mother',
      { props, context: { attrs, slots, emit } },
      undefined,
      beanFullName,
      true,
    );
    ctx.meta.state.inited.touch();
    ctx.meta.util.instanceScope(() => {
      queuePostFlushCb(() => {
        ctx.meta.state.mounted.touch();
        const mother = ctx.bean._getBeanSync('$$mother');
        // instanceScope useless for emit, because emiter and receiver not the same instance
        ctx.instance.emit('motherRef', mother);
      });
    });
  });
  // dispose
  onBeforeUnmount(() => {
    ctx.bean.dispose();
  });
  onUnmounted(() => {
    ctx.dispose();
  });
}
