import { getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, useAttrs, useSlots } from 'vue';
import { queuePostFlushCb } from 'vue';
import { Constructable } from '../decorator/index.js';
import { CabloyContext } from '../core/context/index.js';
import { IBeanRecord, IMotherData } from '../bean/type.js';

export function useMotherPage<M, R>(motherBeanFullName: Constructable<M>, renderBeanFullName: Constructable<R>);
export function useMotherPage<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord>(
  motherBeanFullName: MK,
  renderBeanFullName: RK,
);
export function useMotherPage(motherBeanFullName: string, renderBeanFullName: string);
export function useMotherPage<M>(
  motherBeanFullName: Constructable<M> | string,
  renderBeanFullName: Constructable<M> | string,
) {
  // motherData
  const motherData = { context: {} };
  // use mother
  _useMother(motherData, motherBeanFullName, renderBeanFullName);
}

export function useMother<M, R>(
  props: unknown | undefined,
  emit: unknown | undefined,
  motherBeanFullName: Constructable<M>,
  renderBeanFullName: Constructable<R>,
);
export function useMother<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord>(
  props: unknown | undefined,
  emit: unknown | undefined,
  motherBeanFullName: MK,
  renderBeanFullName: RK,
);
export function useMother(
  props: unknown | undefined,
  emit: unknown | undefined,
  motherBeanFullName: string,
  renderBeanFullName: string,
);
export function useMother<M>(
  props: unknown | undefined,
  emit: unknown | undefined,
  motherBeanFullName: Constructable<M> | string,
  renderBeanFullName: Constructable<M> | string,
) {
  // attrs
  const attrs = useAttrs();
  // slots
  const slots = useSlots();
  // motherData
  const motherData = { props, context: { attrs, slots, emit } };
  // use mother
  _useMother(motherData, motherBeanFullName, renderBeanFullName);
}

function _useMother<M>(
  motherData: IMotherData,
  motherBeanFullName: Constructable<M> | string,
  renderBeanFullName: Constructable<M> | string,
) {
  // ctx
  const ctx = new CabloyContext(getCurrentInstance()!);
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
