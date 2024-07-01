import { getCurrentInstance, onBeforeUnmount, onUnmounted, queuePostFlushCb, useAttrs, useSlots } from 'vue';
import { Constructable } from '../decorator/index.js';
import { ZovaContext } from '../core/context/index.js';
import {
  BeanControllerIdentifier,
  BeanRenderIdentifier,
  BeanStyleIdentifier,
  IBeanRecord,
  IControllerData,
} from '../bean/type.js';

export function useControllerPage<M, R, S>(
  controllerBeanFullName: Constructable<M>,
  renderBeanFullName?: Constructable<R>,
  styleBeanFullName?: Constructable<S>,
);
export function useControllerPage<
  MK extends keyof IBeanRecord,
  RK extends keyof IBeanRecord,
  SK extends keyof IBeanRecord,
>(controllerBeanFullName: MK, renderBeanFullName?: RK, styleBeanFullName?: SK);
// not use type string for typed params
//export function useControllerPage(controllerBeanFullName: string, renderBeanFullName?: string, styleBeanFullName?: string);
export function useControllerPage(
  controllerBeanFullName: Constructable | string,
  renderBeanFullName?: Constructable | string,
  styleBeanFullName?: Constructable | string,
) {
  // controllerData
  const controllerData = { context: {} };
  // use controller
  _useController(controllerData, controllerBeanFullName, renderBeanFullName, styleBeanFullName);
}

export function useController<M, R, S>(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: Constructable<M>,
  renderBeanFullName?: Constructable<R>,
  styleBeanFullName?: Constructable<S>,
);
export function useController<MK extends keyof IBeanRecord, RK extends keyof IBeanRecord, SK extends keyof IBeanRecord>(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: MK,
  renderBeanFullName?: RK,
  styleBeanFullName?: SK,
);
// not use type string for typed params
// export function useController(
//   props: unknown | undefined,
//   emit: unknown | undefined,
//   controllerBeanFullName: string,
//   renderBeanFullName?: string,
//   styleBeanFullName?: string,
// );
export function useController(
  props: unknown | undefined,
  emit: unknown | undefined,
  controllerBeanFullName: Constructable | string,
  renderBeanFullName?: Constructable | string,
  styleBeanFullName?: Constructable | string,
) {
  // attrs
  const attrs = useAttrs();
  // slots
  const slots = useSlots();
  // controllerData
  const controllerData = { props, context: { attrs, slots, emit } };
  // use controller
  _useController(controllerData, controllerBeanFullName, renderBeanFullName, styleBeanFullName);
}

async function _useController(
  controllerData: IControllerData,
  controllerBeanFullName: Constructable | string,
  renderBeanFullName?: Constructable | string,
  styleBeanFullName?: Constructable | string,
) {
  // ctx
  const ctx = new ZovaContext(getCurrentInstance()!);
  // monkey
  if (ctx.app) {
    ctx.app.meta.module._monkeyModuleSync('controllerDataPrepare', undefined, controllerData);
  }
  // dispose
  onBeforeUnmount(() => {
    // undefined better than null
    ctx.instance.emit('controllerRef', undefined);
    if (ctx.bean !== ctx.app.bean) {
      ctx.bean.dispose();
    }
  });
  onUnmounted(() => {
    ctx.dispose();
  });
  // controller
  //onMounted(async () => {
  await ctx.bean._newBeanInner(true, BeanControllerIdentifier, controllerData, undefined, controllerBeanFullName, true);
  if (styleBeanFullName) {
    await ctx.bean._newBeanInner(true, BeanStyleIdentifier, undefined, undefined, styleBeanFullName, true);
  }
  if (renderBeanFullName) {
    await ctx.bean._newBeanInner(true, BeanRenderIdentifier, undefined, undefined, renderBeanFullName, true);
  }
  ctx.meta.state.inited.touch();
  ctx.meta.util.instanceScope(() => {
    queuePostFlushCb(() => {
      ctx.meta.state.mounted.touch();
      const controller = ctx.bean._getBeanSyncOnly(BeanControllerIdentifier);
      // instanceScope useless for emit, because emiter and receiver not the same instance
      ctx.instance.emit('controllerRef', controller);
    });
  });
  //});
}
