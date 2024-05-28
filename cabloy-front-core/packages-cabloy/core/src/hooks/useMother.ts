import { getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, useAttrs, useSlots } from 'vue';
import { queuePostFlushCb } from 'vue';
import { Constructable } from '../decorator/index.js';
import { CabloyContext } from '../core/context/index.js';
import { IBeanRecord, IMotherData } from '../bean/type.js';

export function useMotherPage<M, R>(controllerBeanFullName: Constructable<M>, renderBeanFullName?: Constructable<R>);
export function useMotherPage<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord>(
  controllerBeanFullName: MK,
  renderBeanFullName?: RK,
);
// not use type string for typed params
//export function useMotherPage(controllerBeanFullName: string, renderBeanFullName?: string);
export function useMotherPage<M>(
  controllerBeanFullName: Constructable<M> | string,
  renderBeanFullName?: Constructable<M> | string,
) {
  // controllerData
  const controllerData = { context: {} };
  // use controller
  _useMother(controllerData, controllerBeanFullName, renderBeanFullName);
}

export function useMother<M, R>(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: Constructable<M>,
  renderBeanFullName?: Constructable<R>,
);
export function useMother<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord>(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: MK,
  renderBeanFullName?: RK,
);
// not use type string for typed params
// export function useMother(
//   props: unknown | undefined,
//   emit: unknown | undefined,
//   controllerBeanFullName: string,
//   renderBeanFullName?: string,
// );
export function useMother<M>(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: Constructable<M> | string,
  renderBeanFullName?: Constructable<M> | string,
) {
  // attrs
  const attrs = useAttrs();
  // slots
  const slots = useSlots();
  // controllerData
  const controllerData = { props, context: { attrs, slots, emit } };
  // use controller
  _useMother(controllerData, controllerBeanFullName, renderBeanFullName);
}

function _useMother<M>(
  controllerData: IMotherData,
  controllerBeanFullName: Constructable<M> | string,
  renderBeanFullName?: Constructable<M> | string,
) {
  // ctx
  const ctx = new CabloyContext(getCurrentInstance()!);
  // monkey
  ctx.app.meta.module._monkeyModuleSync('controllerDataPrepare', undefined, controllerData);
  // controller
  onMounted(async () => {
    await ctx.bean._newBeanInner(true, '$$controller', controllerData, undefined, controllerBeanFullName, true);
    if (renderBeanFullName) {
      await ctx.bean._newBeanInner(true, '$$render', undefined, undefined, renderBeanFullName, true);
    }
    ctx.meta.state.inited.touch();
    ctx.meta.util.instanceScope(() => {
      queuePostFlushCb(() => {
        ctx.meta.state.mounted.touch();
        const controller = ctx.bean._getBeanSyncOnly('$$controller');
        // instanceScope useless for emit, because emiter and receiver not the same instance
        ctx.instance.emit('controllerRef', controller);
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
