import { getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, useAttrs, useSlots } from 'vue';
import { queuePostFlushCb } from 'vue';
import { Constructable } from '../decorator/index.js';
import { CabloyContext } from '../core/context/index.js';
import { IBeanRecord } from '../bean/type.js';

export function useMother<M, R>(
  motherBeanFullName: Constructable<M>,
  renderBeanFullName: Constructable<R>,
  props?,
  emit?,
);
export function useMother<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord>(
  motherBeanFullName: MK,
  renderBeanFullName: RK,
  props?,
  emit?,
);
export function useMother(motherBeanFullName: string, renderBeanFullName: string, props?, emit?);
export function useMother<M>(
  motherBeanFullName: Constructable<M> | string,
  renderBeanFullName: Constructable<M> | string,
  props?,
  emit?,
) {
  // ctx
  const ctx = new CabloyContext(getCurrentInstance()!);
  // attrs
  const attrs = useAttrs();
  // slots
  const slots = useSlots();
  // motherData
  const motherData = { props, context: { attrs, slots, emit } };
  // monkey
  ctx.app.meta.module._monkeyModuleSync('motherDataPrepare', undefined, motherData);
  // mother
  onMounted(async () => {
    await ctx.bean._newBeanInner(true, '$$mother', motherData, undefined, motherBeanFullName, true);
    await ctx.bean._newBeanInner(true, '$$render', undefined, undefined, renderBeanFullName, true);
    ctx.meta.state.inited.touch();
    ctx.meta.util.instanceScope(() => {
      queuePostFlushCb(() => {
        ctx.meta.state.mounted.touch();
        const mother = ctx.bean._getBeanSyncOnly('$$mother');
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
