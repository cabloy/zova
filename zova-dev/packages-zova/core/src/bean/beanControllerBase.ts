import { markRaw, useModel } from 'vue';
import { BeanBase } from './beanBase.js';
import { IControllerData } from './type.js';

type Data = Record<string, unknown>;

type DefineModelOptions<T = any> = {
  get?: (v: T) => any;
  set?: (v: T) => any;
};

export type EmitsBase<T> = {
  (e: 'controllerRef', ref: T): void;
};

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
    this.$slots = (controllerData.context.slots ? markRaw(controllerData.context.slots) : undefined) as Slots;
    this.$attrs = (controllerData.context.attrs ? markRaw(controllerData.context.attrs) : undefined) as Data;
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
