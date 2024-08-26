import { ComponentInternalInstance, normalizeClass, normalizeStyle, Ref, ref, useSSRContext, VNode } from 'vue';
import { defu } from 'defu';
import { BeanSimple } from '../../bean/beanSimple.js';
import { Functionable } from '../../decorator/index.js';
import {
  OnHydratePropHasMismatch,
  OnHydratePropHasMismatchResult,
  SSRContext,
  SSRContextState,
} from '../../types/interface/ssr.js';
import { Cast } from '../../types/utils/cast.js';
import { CtxSSRMetaStore } from './ssrMetaStore.js';
import { includeBooleanAttr, isBooleanAttr, isString, stringifyStyle } from '@vue/shared';
import { ErrorSSR } from '../../bean/index.js';

const SymbolIsRuntimeSsrPreHydration = Symbol('SymbolIsRuntimeSsrPreHydration');
const SymbolSSRContext = Symbol('SymbolSSRContext');
const SymbolSSRState = Symbol('SymbolSSRState');
const SymbolOnHydrateds = Symbol('SymbolOnHydrateds');
const SymbolOnHydratePropHasMismatches = Symbol('SymbolOnHydratePropHasMismatches');
const SymbolInstanceUpdates = Symbol('SymbolInstanceUpdates');
const SymbolHydratingCounter = Symbol('SymbolHydratingCounter');

export class CtxSSR extends BeanSimple {
  private [SymbolIsRuntimeSsrPreHydration]: Ref<boolean> = ref(false);
  private [SymbolSSRContext]: SSRContext;
  private [SymbolSSRState]: SSRContextState;
  private [SymbolOnHydrateds]: Functionable[] = [];
  private [SymbolOnHydratePropHasMismatches]: OnHydratePropHasMismatch[] = [];
  private [SymbolInstanceUpdates]: ComponentInternalInstance[] = [];

  private [SymbolHydratingCounter]: number = 0;

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
        this[SymbolSSRState] = Cast(window).__INITIAL_STATE__;
        delete Cast(window).__INITIAL_STATE__;
        document.getElementById('ssr-state-init')?.remove();
      } else {
        this[SymbolSSRState] = {};
      }
    }
    // onHydratePropHasMismatch
    if (process.env.CLIENT && this.isRuntimeSsrPreHydration) {
      this.onHydratePropHasMismatch((el, key, clientValue, vnode, instance) => {
        return this._onHydratePropHasMismatchDefault(el, key, clientValue, vnode, instance);
      });
    }
    // metaStore
    this.metaStore = this.bean._newBeanSimple(CtxSSRMetaStore, false);
    // fix: flash on page load
    if (process.env.DEV && process.env.CLIENT && this.isRuntimeSsrPreHydration) {
      document.body.style.display = 'block';
    }
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
        this._initContext();
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

  private _initContext() {
    const ssrContext = this[SymbolSSRContext];
    ssrContext._meta = defu(ssrContext._meta, {
      htmlAttrs: '',
      headTags: '',
      endingHeadTags: '',
      bodyClasses: '',
      bodyAttrs: 'data-server-rendered',
      bodyTags: '',
    });
    ssrContext.state = ssrContext.state || {};
  }

  onHydrated(fn: Functionable) {
    this[SymbolOnHydrateds].push(fn);
  }

  onHydratePropHasMismatch(fn: OnHydratePropHasMismatch) {
    this[SymbolOnHydratePropHasMismatches].push(fn);
  }

  handleDirectOrOnHydrated(fn: Functionable) {
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      this.onHydrated(fn);
    } else {
      return fn();
    }
  }
  redirect(url: string): void;
  redirect(status: number, url: string): void;
  redirect(status: number | string, url?: string) {
    let code: number | undefined;
    if (typeof status === 'string') {
      url = status;
    } else {
      code = status;
    }
    const error = new Error() as ErrorSSR;
    if (code !== undefined) error.code = code;
    error.url = url;
    throw error;
  }

  private _onHydratePropHasMismatchDefault(
    el: Element,
    key: string,
    clientValue: any,
    _vnode: VNode,
    _instance: ComponentInternalInstance | null,
  ): OnHydratePropHasMismatchResult {
    // expected
    let ignore = false;
    let expected: string | undefined = undefined;
    if (key === 'class') {
      ignore = true;
      if (clientValue !== undefined) {
        expected = normalizeClass(clientValue);
        el.setAttribute(key, expected as string);
      }
    } else if (key === 'style') {
      ignore = true;
      if (clientValue !== undefined) {
        expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
        el.setAttribute(key, expected as string);
      }
    } else if (key === 'id') {
      ignore = true;
      if (clientValue !== undefined) {
        expected = String(clientValue);
        el.setAttribute(key, expected as string);
      }
    } else if (isBooleanAttr(key)) {
      ignore = true;
      if (clientValue !== undefined) {
        const expected = includeBooleanAttr(clientValue);
        if (expected) {
          el.setAttribute(key, '');
        } else {
          el.removeAttribute(key);
        }
      }
    } else if (el.getAttribute(`data-hydrate-ignore-${key}`) !== null) {
      ignore = true;
      if (clientValue !== undefined) {
        expected = String(clientValue);
        el.setAttribute(key, expected as string);
      }
    }
    if (!ignore) return { clientValue };
    return { ignore: true };
  }

  private _hydrated() {
    if (!this.isRuntimeSsrPreHydration) return;
    // should be first
    this.isRuntimeSsrPreHydration = false;
    //
    this[SymbolInstanceUpdates].forEach(instance => {
      if (!instance.isUnmounted && instance.zova) {
        instance.update();
      }
    });
    this[SymbolInstanceUpdates] = [];
    //
    this[SymbolOnHydrateds].forEach(fn => fn());
    this[SymbolOnHydrateds] = [];
    //
    this[SymbolOnHydratePropHasMismatches] = [];
  }

  /** @internal */
  public _hydratePropHasMismatch(
    el: Element,
    key: string,
    clientValue: any,
    vnode: VNode,
    instance: ComponentInternalInstance | null,
  ): OnHydratePropHasMismatchResult {
    for (const fn of this[SymbolOnHydratePropHasMismatches]) {
      const res = fn(el, key, clientValue, vnode, instance);
      if (res.ignore) return res;
      clientValue = res.clientValue;
    }
    return { ignore: false, clientValue };
  }

  /** @internal */
  public _hydratingInc() {
    ++this[SymbolHydratingCounter];
  }

  /** @internal */
  public _hydratingDec() {
    if (--this[SymbolHydratingCounter] === 0) {
      this._hydrated();
    }
  }

  /** @internal */
  public _hydratingInstanceRecord(instance: ComponentInternalInstance) {
    if (this[SymbolInstanceUpdates].indexOf(instance) === -1) {
      this[SymbolInstanceUpdates].push(instance);
      return true;
    }
    return false;
  }
}
