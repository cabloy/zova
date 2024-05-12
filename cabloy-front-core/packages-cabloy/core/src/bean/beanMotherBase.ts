import { markRaw } from 'vue';
import { BeanBase } from './beanBase.js';
import { IMotherData } from './type.js';

type Data = Record<string, unknown>;

export class BeanMotherBase<
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
  public __initMotherData(motherData: IMotherData) {
    this.$props = motherData.props as Props;
    this.$emit = motherData.context.emit as Emits;
    this.$slots = (motherData.context.slots ? markRaw(motherData.context.slots) : undefined) as Slots;
    this.$attrs = (motherData.context.attrs ? markRaw(motherData.context.attrs) : undefined) as Data;
    this.app.meta.module._monkeyModuleSync('motherDataInit', undefined, motherData, this);
  }
}
