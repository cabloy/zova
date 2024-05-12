import { markRaw } from 'vue';
import { BeanBase } from './beanBase.js';
import { IMotherData } from './type.js';

type Data = Record<string, unknown>;

export class BeanMotherBase<
  Props = unknown,
  Emits = unknown,
  Slots = unknown,
  TScopeModule = unknown,
> extends BeanBase<TScopeModule> {
  public $props: Props;
  public $attrs: Data;
  public $slots: Slots;
  public $emit: Emits;

  /** @internal */
  public __initMotherData(motherData: IMotherData) {
    this.$props = motherData.props as Props;
    this.$attrs = markRaw(motherData.context?.attrs || {}) as Data;
    this.$slots = markRaw(motherData.context?.slots || {}) as Slots;
    this.$emit = motherData.context?.emit as Emits;
  }
}
