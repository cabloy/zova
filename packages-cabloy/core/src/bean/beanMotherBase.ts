import { markRaw, RendererNode } from 'vue';
import { BeanBase } from './beanBase.js';
import { IModuleLocaleText } from './resource/locale/type.js';

type Data = Record<string, unknown>;

export class BeanMotherBase<
  Props = unknown,
  Emits = unknown,
  Slots = {},
  TScopeModule = unknown,
> extends BeanBase<TScopeModule> {
  public $props: Props;
  public $attrs: Data;
  public $slots: Slots;
  public $emit: Emits;

  public get $el(): RendererNode {
    return this.ctx.$el;
  }

  public get $text(): IModuleLocaleText {
    return this.app.$text;
  }

  private __initMotherParams(motherParams) {
    this.$props = motherParams.props;
    this.$attrs = markRaw(motherParams.context?.attrs);
    this.$slots = markRaw(motherParams.context?.slots);
    this.$emit = motherParams.context?.emit;
  }
}
