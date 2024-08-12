import { Ref, ref, useSSRContext } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SSRContext } from 'vue/server-renderer';
import { Functionable } from '../../decorator/index.js';

const SymbolIsRuntimeSsrPreHydration = Symbol('SymbolIsRuntimeSsrPreHydration');
const SymbolSSRContext = Symbol('SymbolSSRContext');
const SymbolOnHydrateds = Symbol('SymbolOnHydrateds');

export class CtxSSR extends BeanSimple {
  private [SymbolIsRuntimeSsrPreHydration]: Ref<boolean> = ref(false);
  private [SymbolSSRContext]: SSRContext;
  private [SymbolOnHydrateds]: Functionable[];

  private _counter: number = 0;

  protected __init__() {
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

  onHydrated(fn: Functionable) {
    this[SymbolOnHydrateds].push(fn);
  }

  private _hydrated() {
    if (!this.isRuntimeSsrPreHydration) return;
    this[SymbolOnHydrateds].forEach(fn => fn());
    this.isRuntimeSsrPreHydration = false;
  }

  /** @internal */
  public _hydratingInc() {
    ++this._counter;
  }

  /** @internal */
  public _hydratingDec() {
    if (--this._counter === 0) {
      this._hydrated();
    }
  }
}
