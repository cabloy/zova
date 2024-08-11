import { Ref, ref } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';

const SymbolIsRuntimeSsrPreHydration = Symbol('SymbolIsRuntimeSsrPreHydration');

export class AppSSR extends BeanSimple {
  private [SymbolIsRuntimeSsrPreHydration]: Ref<boolean> = ref(false);

  /** @internal */
  public async initialize() {
    if (process.env.SERVER) {
      this[SymbolIsRuntimeSsrPreHydration].value = true;
    } else if (process.env.CLIENT && document.body.getAttribute('data-server-rendered') !== null) {
      this[SymbolIsRuntimeSsrPreHydration].value = true;
    }
  }

  get isRuntimeSsrPreHydration() {
    return this[SymbolIsRuntimeSsrPreHydration].value;
  }

  set isRuntimeSsrPreHydration(value) {
    this[SymbolIsRuntimeSsrPreHydration].value = value;
  }
}
