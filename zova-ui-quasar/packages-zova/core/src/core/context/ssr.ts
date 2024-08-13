import { Ref, ref, useSSRContext } from 'vue';
import * as devalue from 'devalue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { Functionable } from '../../decorator/index.js';
import { SSRContext, SSRContextState } from '../../types/interface/ssr.js';
import { Cast } from '../../types/utils/cast.js';
import { CtxSSRMetaStore } from './ssrMetaStore.js';

const SymbolIsRuntimeSsrPreHydration = Symbol('SymbolIsRuntimeSsrPreHydration');
const SymbolSSRContext = Symbol('SymbolSSRContext');
const SymbolSSRState = Symbol('SymbolSSRState');
const SymbolOnHydrateds = Symbol('SymbolOnHydrateds');

export class CtxSSR extends BeanSimple {
  private [SymbolIsRuntimeSsrPreHydration]: Ref<boolean> = ref(false);
  private [SymbolSSRContext]: SSRContext;
  private [SymbolSSRState]: SSRContextState;
  private [SymbolOnHydrateds]: Functionable[] = [];

  private _hydratingCounter: number = 0;

  public metaStore: CtxSSRMetaStore;

  /** @internal */
  public initialize() {
    // SymbolIsRuntimeSsrPreHydration
    if (process.env.SERVER) {
      this[SymbolIsRuntimeSsrPreHydration].value = true;
    } else if (process.env.CLIENT && document.body.getAttribute('data-server-rendered') !== null) {
      this[SymbolIsRuntimeSsrPreHydration].value = true;
    }
    // SymbolSSRState
    if (process.env.CLIENT) {
      if (Cast(window).__INITIAL_STATE__) {
        this[SymbolSSRState] = devalue.parse(Cast(window).__INITIAL_STATE__);
      } else {
        this[SymbolSSRState] = {};
      }
    }
    // metaStore
    this.metaStore = this.bean._newBeanSimple(CtxSSRMetaStore, false);
  }

  get isRuntimeSsrPreHydration() {
    return this[SymbolIsRuntimeSsrPreHydration].value;
  }

  set isRuntimeSsrPreHydration(value) {
    this[SymbolIsRuntimeSsrPreHydration].value = value;
  }

  get context() {
    if (process.env.CLIENT) throw new Error('cannot called in client');
    if (!this[SymbolSSRContext]) {
      this.ctx.meta.util.instanceScope(() => {
        this[SymbolSSRContext] = useSSRContext()!;
        this[SymbolSSRContext].rendered = () => {
          this._onRenderedLast();
        };
      });
    }
    return this[SymbolSSRContext];
  }

  get state() {
    if (!this[SymbolSSRState]) {
      if (process.env.SERVER) {
        this[SymbolSSRState] = this.context.state;
      }
    }
    return this[SymbolSSRState];
  }

  private _onRenderedLast() {
    console.log('onRenderedLast');
  }

  onHydrated(fn: Functionable) {
    this[SymbolOnHydrateds].push(fn);
  }

  handleDirectOrOnHydrated(fn: Functionable) {
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      this.onHydrated(fn);
    } else {
      return fn();
    }
  }

  private _hydrated() {
    if (!this.isRuntimeSsrPreHydration) return;
    this[SymbolOnHydrateds].forEach(fn => fn());
    this.isRuntimeSsrPreHydration = false;
  }

  /** @internal */
  public _hydratingInc() {
    ++this._hydratingCounter;
  }

  /** @internal */
  public _hydratingDec() {
    if (--this._hydratingCounter === 0) {
      this._hydrated();
    }
  }
}
