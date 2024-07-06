import { useModel } from 'vue';
import { BeanBase } from './beanBase.js';
import { IControllerData } from './type.js';
import { Cast } from '../types/utils/cast.js';
import { useRef } from '../vue/ref.js';

type Data = Record<string, unknown>;

type DefineModelOptions<T = any> = {
  get?: (v: T) => any;
  set?: (v: T) => any;
};

export interface PropsBase<Controller = unknown, Slots = unknown> {
  controllerRef?: (ref: Controller) => void;
  slots?: Slots;
}

export class BeanControllerBase<
  TScopeModule = unknown,
  Props = unknown,
  Emits = unknown,
  Slots = unknown,
> extends BeanBase<TScopeModule> {
  public $props: Props;
  public $emit: Emits;
  public $slots: Slots;
  public $attrs: Data;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    this.$props = controllerData.props as Props;
    this.$emit = controllerData.context.emit as Emits;
    this.$attrs = controllerData.context.attrs as Data;
    this.$slots = useRef(() => {
      const propSlots = Cast(this.$props).slots;
      const contextSlots = controllerData.context.slots;
      if (!propSlots) {
        return contextSlots;
      } else {
        return contextSlots ? Object.assign({}, propSlots, contextSlots) : propSlots;
      }
    });
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  // @ts-ignore ignore
  protected $useModel(options?: DefineModelOptions<Props['modelValue']>): Props['modelValue'];
  protected $useModel<K extends keyof Props>(name: K, options?: DefineModelOptions<Props[K]>): Props[K];
  protected $useModel(name?, options?) {
    if (typeof name === 'object') {
      options = name;
      name = 'modelValue';
    }
    if (!name) name = 'modelValue';
    return useModel(this.$props as any, name, options);
  }
}
