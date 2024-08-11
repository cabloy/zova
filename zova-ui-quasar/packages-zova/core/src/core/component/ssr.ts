import { Ref, ref, useSSRContext } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SSRContext } from 'vue/server-renderer';

const SymbolIsRuntimeSsrPreHydration = Symbol('SymbolIsRuntimeSsrPreHydration');
const SymbolSSRContext = Symbol('SymbolSSRContext');

export class AppSSR extends BeanSimple {
  private [SymbolIsRuntimeSsrPreHydration]: Ref<boolean> = ref(false);
  private [SymbolSSRContext]: SSRContext;

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

  get context() {
    if (!this[SymbolSSRContext]) {
      this.ctx.meta.util.instanceScope(() => {
        this[SymbolSSRContext] = useSSRContext()!;
      });
    }
    return this[SymbolSSRContext];
  }
}
