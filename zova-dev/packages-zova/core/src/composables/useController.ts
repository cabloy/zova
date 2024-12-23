import {
  getCurrentInstance,
  onBeforeUnmount,
  onServerPrefetch,
  onUnmounted,
  queuePostFlushCb,
  useAttrs,
  useSlots,
} from 'vue';
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
  if (process.env.CLIENT) {
    // dispose
    onBeforeUnmount(() => {
      if (!ctx.bean) return;
      // undefined better than null
      setControllerRef(ctx, false);
      if (ctx.bean !== ctx.app.bean) {
        ctx.bean.dispose();
      }
    });
    onUnmounted(() => {
      if (!ctx.bean) return;
      ctx.dispose();
    });
  }

  async function __load() {
    // controller
    await ctx.bean._newBeanInner(
      true,
      BeanControllerIdentifier,
      controllerData,
      undefined,
      controllerBeanFullName,
      true,
    );
    if (styleBeanFullName) {
      await ctx.bean._newBeanInner(true, BeanStyleIdentifier, undefined, undefined, styleBeanFullName, true);
    }
    if (renderBeanFullName) {
      await ctx.bean._newBeanInner(true, BeanRenderIdentifier, undefined, undefined, renderBeanFullName, true);
    }
    // must touch inited on server/client, force router.use effect
    ctx.meta.state.inited.touch();
    if (process.env.CLIENT) {
      ctx.util.instanceScope(() => {
        queuePostFlushCb(() => {
          ctx.meta.state.mounted.touch();
          setControllerRef(ctx, true);
        });
      });
    }
  }

  // load
  if (process.env.SERVER) {
    onServerPrefetch(() => {
      return __load();
    });
  } else {
    __load();
  }
}

function setControllerRef(ctx: ZovaContext, on: boolean) {
  const controller = ctx.bean?._getBeanSyncOnly(BeanControllerIdentifier) as any;
  if (!controller) return;
  // instanceScope useless for emit, because emiter and receiver not the same instance
  if (controller.$props?.controllerRef) {
    controller.$props.controllerRef(on ? controller : undefined);
  }
}
