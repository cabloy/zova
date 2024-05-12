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
  public __initMotherParams(motherParams: IMotherData) {
    this.$props = motherParams.props as Props;
    this.$attrs = markRaw(motherParams.context?.attrs || {}) as Data;
    this.$slots = markRaw(motherParams.context?.slots || {}) as Slots;
    this.$emit = motherParams.context?.emit as Emits;
  }
}
