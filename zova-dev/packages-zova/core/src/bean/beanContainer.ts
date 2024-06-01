import { isClass } from '../utils/isClass.js';
import { ZovaApplication, ZovaContext } from '../core/index.js';
import { Constructable, Functionable, IDecoratorUseOptionsBase } from '../decorator/index.js';
import { appResource } from '../core/resource.js';
import { MetadataKey } from '../core/metadata.js';
import { IBeanRecord, IBeanScopeRecord, IControllerData, TypeBeanScopeRecordKeys } from './type.js';
import { BeanBase } from './beanBase.js';
import { BeanSimple } from './beanSimple.js';
import { compose, composeAsync } from '@cabloy/compose';
import { markRaw, reactive, shallowReactive, provide as composableProvide, inject as composableInject } from 'vue';
import { Cast } from '../types/utils/cast.js';
import { IInjectRecord } from '../types/interface/inject.js';

const ProxyMagic = Symbol.for('Bean#ProxyMagic');
const BeanContainerInstances = Symbol.for('Bean#Instances');

export type BeanContainerLike = IBeanRecord & BeanContainer;

export class BeanContainer {
  private app: ZovaApplication;
  private ctx: ZovaContext;

  // fullName / uuid / propName
  private [BeanContainerInstances]: Record<MetadataKey, unknown> = shallowReactive({});

  static create(app: ZovaApplication, ctx: ZovaContext | null) {
    const beanContainer = new BeanContainer(app, ctx);
    const proxy = new Proxy(beanContainer, {
      get(obj, prop) {
        if (typeof prop === 'symbol') return obj[prop];
        if (obj[prop]) return obj[prop];
        return obj._getBeanSyncOnly(prop);
      },
    });
    return markRaw(proxy) as BeanContainerLike;
  }

  protected constructor(app: ZovaApplication, ctx: ZovaContext | null) {
    this.app = app;
    this.ctx = ctx as any;
  }

  /** @internal */
  public dispose() {
    const beanInstances = this[BeanContainerInstances];
    for (const prop in beanInstances) {
      if (prop.startsWith('$$')) continue;
      const beanInstance = Cast(beanInstances[prop]);
      if (beanInstance.__dispose__) {
        this.app.meta.module._monkeyModule('beanDispose', undefined, this, beanInstance);
        this.runWithInstanceScopeOrAppContext(() => {
          beanInstance.__dispose__();
        });
        this.app.meta.module._monkeyModule('beanDisposed', undefined, this, beanInstance);
      }
    }
    this[BeanContainerInstances] = shallowReactive({});
  }

  runWithInstanceScopeOrAppContext(fn, tracking?: boolean) {
    if (this.ctx) {
      return this.ctx.meta.util.instanceScope(fn, tracking);
    } else {
      return this.app.vue.runWithContext(fn);
    }
  }

  provide<K extends keyof IInjectRecord>(injectKey: K, value: IInjectRecord[K]) {
    if (this.ctx) {
      return this.ctx.meta.util.instanceScope(() => {
        return composableProvide(injectKey, value as any);
      });
    } else {
      return this.app.vue.provide(injectKey, value as any);
    }
  }

  inject<K extends keyof IInjectRecord>(injectKey: K): IInjectRecord[K];
  inject<K extends keyof IInjectRecord>(
    injectKey: K,
    defaultValue: IInjectRecord[K],
    treatDefaultAsFactory?: false,
  ): IInjectRecord[K];
  inject<K extends keyof IInjectRecord>(
    injectKey: K,
    defaultValue: IInjectRecord[K] | (() => IInjectRecord[K]),
    treatDefaultAsFactory?: true,
  ): IInjectRecord[K];
  inject(injectKey, defaultValue?, treatDefaultAsFactory?) {
    return this.runWithInstanceScopeOrAppContext(() => {
      return composableInject(injectKey, defaultValue, treatDefaultAsFactory);
    });
  }

  defineProperty<T>(obj: T, prop: string, attributes: PropertyDescriptor & ThisType<any>): T {
    const self = this;
    const attrs = { ...attributes };
    if (attributes.get) {
      attrs.get = function () {
        const innerKey = `__innerKey_${prop}`;
        if (!obj[innerKey]) {
          self.runWithInstanceScopeOrAppContext(() => {
            obj[innerKey] = attributes.get!();
          });
        }
        return obj[innerKey];
      };
    }
    return Object.defineProperty(obj, prop, attrs);
  }

  /** get specific module's scope */
  scope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  scope<T>(moduleScope: string): T;
  scope<T>(moduleScope: string): T {
    if (this.ctx) {
      return this.app.bean.scope(moduleScope);
    }
    return this._getBeanSyncOnly(`${moduleScope}.scope.module`);
  }

  async getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): Promise<IBeanScopeRecord[K]>;
  async getScope<T>(moduleScope: string): Promise<T>;
  async getScope<T>(moduleScope: string): Promise<T> {
    if (this.ctx) {
      return await this.app.bean.getScope(moduleScope);
    }
    // module: load
    await this.app.meta.module.use(moduleScope);
    return this.scope(moduleScope);
  }

  _getBeanSync<K extends keyof IBeanRecord>(
    beanFullName: K,
    markReactive?: boolean,
    forceLoad?: boolean,
  ): IBeanRecord[K] | undefined;
  _getBeanSync<T>(key: string, markReactive?: boolean, forceLoad?: boolean): T | undefined;
  _getBeanSync<T>(key: string, markReactive?: boolean, forceLoad?: boolean): T | undefined {
    const beanInstance: any = this[BeanContainerInstances][key];
    if (!beanInstance) {
      // bean not loaded, so async load to raise the next call
      if (forceLoad !== false) {
        this._getBean(key, markReactive);
      }
      return undefined;
    }
    if (beanInstance.__inited__ && !beanInstance.__inited__.state) {
      return undefined;
    }
    return beanInstance as T;
  }

  _getBeanSyncOnly<T>(key: MetadataKey): T {
    return this[BeanContainerInstances][key] as T;
  }

  async _getBean<T>(A: Constructable<T>, markReactive?: boolean): Promise<T>;
  async _getBean<K extends keyof IBeanRecord>(beanFullName: K, markReactive?: boolean): Promise<IBeanRecord[K]>;
  async _getBean<T>(beanFullName: string, markReactive?: boolean): Promise<T>;
  async _getBean<T>(beanFullName: Constructable<T> | string, markReactive?: boolean): Promise<T> {
    return await this._getBeanSelector(beanFullName as any, markReactive);
  }

  async _getBeanSelector<T>(A: Constructable<T>, markReactive?: boolean, selector?: string): Promise<T>;
  async _getBeanSelector<K extends keyof IBeanRecord>(
    beanFullName: K,
    markReactive?: boolean,
    selector?: string,
  ): Promise<IBeanRecord[K]>;
  async _getBeanSelector<T>(beanFullName: string, markReactive?: boolean, selector?: string): Promise<T>;
  async _getBeanSelector<T>(
    beanFullName: Constructable<T> | string,
    markReactive?: boolean,
    selector?: string,
  ): Promise<T> {
    return await this._getBeanSelectorInner(null, undefined, beanFullName, markReactive, selector);
  }

  async _getBeanSelectorInner<T>(
    recordProp: MetadataKey | null,
    beanComposable: Functionable | undefined,
    beanFullName: Constructable<T> | string | undefined,
    markReactive?: boolean,
    selector?: string,
  ): Promise<T> {
    // fullName
    const fullName = await this._getBeanFullNameByComposableOrClass(beanComposable, beanFullName);
    if (!fullName) {
      // not found
      return null!;
    }
    // same as _getBean if selector is undefined/null/'', as as to get the same bean instance
    //   not use !selector which maybe is 0
    const isSelectorValid = !this.app.meta.util.isNullOrEmptyString(selector);
    const key = !isSelectorValid ? fullName : `${fullName}#${selector}`;
    if (this[BeanContainerInstances][key] === undefined) {
      if (isSelectorValid) {
        await this._newBeanInner(true, recordProp, null, beanComposable, fullName, markReactive, selector);
      } else {
        await this._newBeanInner(true, recordProp, null, beanComposable, fullName, markReactive);
      }
    }
    return this[BeanContainerInstances][key] as T;
  }

  _newBeanSimple<T>(A: Constructable<T>, markReactive: boolean, ...args): T {
    // prepare
    const beanInstance = this._prepareBeanInstance(undefined, A, A, args, false, markReactive);
    // init
    if (beanInstance.__init__) {
      beanInstance.__init__(...args);
    }
    // ok
    return beanInstance;
  }

  async _newBean<T>(A: Constructable<T>, markReactive?: boolean, ...args): Promise<T>;
  async _newBean<K extends keyof IBeanRecord>(
    beanFullName: K,
    markReactive?: boolean,
    ...args
  ): Promise<IBeanRecord[K]>;
  async _newBean<T>(beanFullName: string, markReactive?: boolean, ...args): Promise<T>;
  async _newBean<T>(beanFullName: Constructable<T> | string, markReactive?: boolean, ...args): Promise<T> {
    return await this._newBeanInner(false, null, null, undefined, beanFullName, markReactive, ...args);
  }

  async _newBeanSelector<T>(A: Constructable<T>, markReactive?: boolean, selector?: string, ...args): Promise<T>;
  async _newBeanSelector<K extends keyof IBeanRecord>(
    beanFullName: K,
    markReactive?: boolean,
    selector?: string,
    ...args
  ): Promise<IBeanRecord[K]>;
  async _newBeanSelector<T>(beanFullName: string, markReactive?: boolean, selector?: string, ...args): Promise<T>;
  async _newBeanSelector<T>(
    beanFullName: Constructable<T> | string,
    markReactive?: boolean,
    selector?: string,
    ...args
  ): Promise<T> {
    return await this._newBean(beanFullName as any, markReactive, selector, ...args);
  }

  /** @internal */
  public async _newBeanInner<T>(
    record: boolean,
    recordProp: MetadataKey | null,
    controllerData: any,
    beanComposable: Functionable | undefined,
    beanFullName: Constructable<T> | string | undefined,
    markReactive?: boolean,
    ...args
  ): Promise<T> {
    // bean composable
    if (beanComposable) {
      return await this._createBeanInstance<T>(
        record,
        recordProp,
        controllerData,
        beanComposable,
        undefined,
        undefined,
        args,
        false,
        markReactive,
      );
    }
    // bean options
    const beanOptions = await this._getBeanOptionsForce(beanFullName);
    if (!beanOptions) {
      // class
      if (typeof beanFullName === 'function' && isClass(beanFullName)) {
        return await this._createBeanInstance<T>(
          record,
          recordProp,
          controllerData,
          undefined,
          undefined,
          beanFullName,
          args,
          false,
          markReactive,
        );
      }
      // throw new Error(`bean not found: ${beanFullName}`);
      return null!;
    }
    // beanFullName
    return await this._createBeanInstance<T>(
      record,
      recordProp,
      controllerData,
      undefined,
      beanOptions.beanFullName,
      beanOptions.beanClass as Constructable<T>,
      args,
      beanOptions.aop,
      // default is true: same as inject prop
      markReactive ?? beanOptions.markReactive ?? true,
    );
  }

  private async _getBeanFullNameByComposableOrClass(beanComposable: Functionable | undefined, beanFullName: any) {
    // bean composable
    if (beanComposable) {
      return appResource.getBeanFullNameOfComposable(beanComposable);
    }
    // bean options
    const beanOptions = await this._getBeanOptionsForce(beanFullName);
    if (!beanOptions) {
      // not found
      return undefined;
    }
    return beanOptions.beanFullName;
  }

  private async _getBeanOptionsForce(beanFullName: any) {
    // class
    if (typeof beanFullName === 'function' && isClass(beanFullName)) {
      return appResource.getBean(beanFullName);
    }
    // check if uuid
    if (!this.app.meta.util.isUuid(beanFullName)) {
      // module: name
      const moduleName = beanFullName.split('.')[0];
      // module: load
      await this.app.meta.module.use(moduleName);
    }
    // get
    return appResource.getBean(beanFullName);
  }

  private async _createBeanInstance<T>(
    record: boolean,
    recordProp: MetadataKey | null,
    controllerData: IControllerData,
    beanComposable: Functionable | undefined,
    beanFullName: string | undefined,
    beanClass: Constructable<T> | undefined,
    args: any[],
    aop: boolean | undefined,
    markReactive: boolean | undefined,
  ): Promise<T> {
    // prepare
    const beanInstance = this._prepareBeanInstance(beanComposable, beanFullName, beanClass, args, aop, markReactive);
    // special for controller
    if (controllerData) {
      beanInstance.__initControllerData(controllerData);
    }
    // record
    if (record) {
      // fullName
      const fullName = await this._getBeanFullNameByComposableOrClass(beanComposable, beanFullName);
      if (fullName) {
        this[BeanContainerInstances][fullName] = beanInstance;
      }
      // always record for app/ctx bean
      if (recordProp) {
        this.__recordProp(recordProp, fullName, beanInstance, true);
      }
    }
    // init
    if (!beanComposable) {
      await this._initBeanInstance(beanFullName, beanInstance, args);
    }
    // ok
    return beanInstance;
  }

  private _prepareBeanInstance(
    beanComposable: Functionable | undefined,
    beanFullName,
    beanClass,
    args,
    aop,
    markReactive,
  ) {
    // create
    let beanInstance;
    if (beanComposable) {
      beanInstance = this._createBeanComposableInstance(beanComposable, args);
    } else {
      if (beanClass.prototype.__init__) {
        beanInstance = new beanClass();
      } else {
        beanInstance = new beanClass(...args);
      }
    }
    // app/ctx
    if (beanInstance instanceof BeanSimple) {
      // app
      (<any>beanInstance).app = this.app;
      // ctx: always set even if is null, so as to prevent magic method __get__ take effect.
      (<any>beanInstance).ctx = this.ctx;
    }
    // beanFullName
    if (typeof beanFullName === 'string') {
      __setPropertyValue(beanInstance, '__beanFullName__', beanFullName);
    }
    // reactive
    if (markReactive) {
      beanInstance = reactive(beanInstance);
    } else {
      beanInstance = markRaw(beanInstance);
    }
    // aop: proxy
    const beanInstanceProxy = this._patchBeanInstance(beanFullName || beanClass, beanInstance, aop);
    if (beanInstanceProxy) {
      // reactive
      if (markReactive) {
        beanInstance = reactive(beanInstanceProxy);
      } else {
        beanInstance = markRaw(beanInstanceProxy);
      }
    }
    // ok
    return beanInstance;
  }

  private _createBeanComposableInstance(beanComposable, args) {
    return this.runWithInstanceScopeOrAppContext(function () {
      return beanComposable(...args);
    });
  }

  private async _initBeanInstance(beanFullName, beanInstance, args) {
    // inject
    await this._injectBeanInstance(beanInstance, beanFullName);
    // init
    await this.app.meta.module._monkeyModule('beanInit', undefined, this, beanInstance);
    if (beanInstance.__init__) {
      await this.runWithInstanceScopeOrAppContext(async () => {
        await beanInstance.__init__(...args);
      });
    }
    await this.app.meta.module._monkeyModule('beanInited', undefined, this, beanInstance);
    if (beanInstance.__inited__) {
      beanInstance.__inited__.touch();
    }
    // ok
    return beanInstance;
  }

  private async _injectBeanInstance(beanInstance, beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const uses = appResource.getUses(beanOptions.beanClass.prototype);
    if (!uses) return;
    for (const key in uses) {
      const useOptions = uses[key];
      // beanComposable
      const targetBeanComposable = useOptions.beanComposable;
      // beanClass
      let targetBeanFullName = useOptions.beanFullName;
      if (!targetBeanFullName && useOptions.beanClass) {
        targetBeanFullName = appResource.getBeanFullName(useOptions.beanClass);
      }
      const targetBeanInstance = await this._injectBeanInstanceProp(
        targetBeanComposable,
        targetBeanFullName,
        useOptions,
      );
      if (targetBeanInstance) {
        targetBeanInstance.__v_isShallow_patch = true;
        beanInstance[key] = targetBeanInstance;
        delete targetBeanInstance.__v_isShallow_patch;
      } else {
        beanInstance[key] = targetBeanInstance;
      }
    }
  }

  private async _injectBeanInstanceProp(
    targetBeanComposable: Functionable | undefined,
    targetBeanFullName: string | undefined,
    useOptions: IDecoratorUseOptionsBase,
  ) {
    // 1. use name
    if (useOptions.name) {
      return this[BeanContainerInstances][useOptions.name];
    }
    // 2. use prop
    if (!targetBeanComposable && !targetBeanFullName) {
      return this[BeanContainerInstances][useOptions.prop];
    }
    // 3. targetBeanFullName
    let targetOptions;
    if (targetBeanComposable) {
      targetOptions = {
        containerScope: undefined,
        markReactive: undefined,
      };
    } else if (targetBeanFullName) {
      targetOptions = await this._getBeanOptionsForce(targetBeanFullName);
      if (!targetOptions) {
        throw new Error(`not found bean class: ${targetBeanFullName}`);
      }
    }
    // options: containerScope
    const containerScope = useOptions.containerScope ?? targetOptions.containerScope ?? 'ctx';
    // options: markReactive: default is true
    const markReactive = useOptions.markReactive ?? targetOptions.markReactive ?? true;
    // options: selector: maybe empty string
    const selector = useOptions.selector;
    // recordProp
    //const recordProp = useOptions.name || useOptions.prop;
    const recordProp = useOptions.prop;
    // targetInstance
    let targetInstance;
    if (containerScope === 'app') {
      targetInstance = await this.app.bean._getBeanSelectorInner(
        null,
        targetBeanComposable,
        targetBeanFullName,
        markReactive,
        selector,
      );
      await this._injectBeanInstanceProp_appBean(recordProp, targetBeanComposable, targetBeanFullName, targetInstance);
    } else if (containerScope === 'ctx') {
      targetInstance = await this._getBeanSelectorInner(
        recordProp,
        targetBeanComposable,
        targetBeanFullName,
        markReactive,
        selector,
      );
    } else if (containerScope === 'new') {
      // not record prop
      targetInstance = await this._newBeanInner(
        false,
        null,
        null,
        targetBeanComposable,
        targetBeanFullName,
        markReactive,
        selector,
      );
    }
    return targetInstance;
  }

  private async _injectBeanInstanceProp_appBean(recordProp, targetBeanComposable, _targetBeanFullName, targetInstance) {
    if (!targetInstance) return;
    // only when ctx bean
    if (!this.ctx) return;
    // record prop
    this.__recordProp(recordProp, undefined, targetInstance, false);
    // force init
    if (!targetBeanComposable) {
      await targetInstance.__inited__.wait();
    }
  }

  private _patchBeanInstance(beanFullNameOrBeanClass, beanInstance, aop) {
    if (!beanFullNameOrBeanClass) return undefined;
    // not aop on aop
    if (aop) return undefined;
    // aop chains
    const _aopChains = this._prepareAopChains(beanFullNameOrBeanClass, beanInstance);
    // no aop
    if (_aopChains.length === 0) return undefined;
    // aop
    return this._newBeanProxy(beanFullNameOrBeanClass, beanInstance);
  }

  private _newBeanProxy(beanFullName, beanInstance) {
    const self = this;
    const proxy = new Proxy(beanInstance, {
      get(target, prop, receiver) {
        if (typeof prop === 'symbol') {
          return target[prop];
        }
        if (__isInnerMethod(prop)) {
          if (prop === '__v_isShallow' && target.__v_isShallow_patch) return target.__v_isShallow_patch;
          return target[prop];
        }
        // descriptorInfo
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) return target[prop];
        const methodType = __methodTypeOfDescriptor(descriptorInfo);
        // get prop
        if (!methodType) {
          const methodName = `__get_${prop}__`;
          const methodNameMagic = '__get__';
          const _aopChainsProp = self._getAopChainsProp(beanFullName, methodName, methodNameMagic);
          if (_aopChainsProp.length === 0) return target[prop];
          // context
          const context = {
            target,
            receiver,
            prop,
            value: undefined,
          };
          // aop
          self.__composeForProp(_aopChainsProp)(context, (context, next) => {
            if (context.value === undefined) {
              if (!descriptorInfo && target.__get__) {
                context.value = target.__get__(prop);
              } else {
                context.value = target[prop];
              }
            }
            next();
          });
          // ok
          return context.value;
        }
        // method
        return self._getInstanceMethodProxy(beanFullName, target, prop, methodType);
      },
      set(target, prop, value, receiver) {
        if (typeof prop === 'symbol') {
          target[prop] = value;
          return true;
        }
        if (__isInnerMethod(prop)) {
          target[prop] = value;
          return true;
        }
        // descriptorInfo
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) {
          target[prop] = value;
          return true;
        }
        const methodName = `__set_${prop}__`;
        const methodNameMagic = '__set__';
        const _aopChainsProp = self._getAopChainsProp(beanFullName, methodName, methodNameMagic);
        if (_aopChainsProp.length === 0) {
          target[prop] = value;
          return true;
        }
        // context
        const context = {
          target,
          receiver,
          prop,
          value,
        };
        // aop
        self.__composeForProp(_aopChainsProp)(context, (context, next) => {
          if (!descriptorInfo && target.__set__) {
            target.__set__(prop, context.value);
          } else {
            target[prop] = context.value;
          }
          next();
        });
        // ok
        return true;
      },
    });
    return proxy;
  }

  private _getInstanceMethodProxy(beanFullName, beanInstance, prop, methodType) {
    const self = this;
    // not aop magic methods
    if (__isInnerMethod(prop)) {
      return beanInstance[prop];
    }
    // aop chains
    const _aopChainsProp = this._getAopChainsProp(beanFullName, prop, null);
    if (_aopChainsProp.length === 0) return beanInstance[prop];
    // proxy
    const methodProxyKey = `__aopproxy_method_${prop}__`;
    if (beanInstance[methodProxyKey]) return beanInstance[methodProxyKey];
    const methodProxy = new Proxy(beanInstance[prop], {
      apply(target, thisArg, args) {
        // context
        const context = {
          target: beanInstance,
          receiver: thisArg,
          prop,
          arguments: args,
          result: undefined,
        };
        // aop
        if (methodType === 'Function') {
          self.__composeForProp(_aopChainsProp)(context, (context, next) => {
            if (context.result === undefined) {
              context.result = target.apply(thisArg, args);
            }
            next();
          });
          // ok
          return context.result;
        }
        if (methodType === 'AsyncFunction') {
          return new Promise((resolve, reject) => {
            self
              .__composeForPropAsync(_aopChainsProp)(context, async (context, next) => {
                if (context.result === undefined) {
                  context.result = await target.apply(thisArg, args);
                }
                await next();
              })
              .then(() => {
                resolve(context.result);
              })
              .catch(err => {
                reject(err);
              });
          });
        }
      },
    });
    __setPropertyValue(beanInstance, methodProxyKey, methodProxy);
    return methodProxy;
  }

  private _prepareAopChains(beanFullNameOrBeanClass, beanInstance) {
    if (!beanFullNameOrBeanClass) return [];
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullNameOrBeanClass);
    const host = beanOptions || beanFullNameOrBeanClass;
    if (host.__aopChains__) return host.__aopChains__;
    // chains
    let chains: MetadataKey[] = [];
    if (beanOptions && !beanOptions.aop) {
      const aops = appResource.findAopsMatched(beanOptions.beanFullName);
      if (aops) {
        chains = chains.concat(aops);
      }
    }
    // magic self
    if (__hasMagicMothod(beanInstance)) {
      chains.push(ProxyMagic);
    }
    // hold
    host.__aopChains__ = chains;
    return chains;
  }

  private _getAopChains(beanFullName) {
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    return host.__aopChains__;
  }

  private _getAopChainsProp(beanFullName, methodName, methodNameMagic) {
    const chainsKey = `__aopChains_${methodName}__`;
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    if (!host.__aopChainsKey__) host.__aopChainsKey__ = {};
    if (host.__aopChainsKey__[chainsKey]) return host.__aopChainsKey__[chainsKey];
    const _aopChains = this._getAopChains(beanFullName);
    const chains: [MetadataKey, string][] = [];
    for (const aopKey of _aopChains) {
      if (aopKey === ProxyMagic) {
        chains.push([aopKey, methodName]);
      } else {
        const aop: any = this._getBeanSyncOnly(aopKey as string);
        if (aop[methodName]) {
          chains.push([aopKey, methodName]);
        } else if (methodNameMagic && aop[methodNameMagic]) {
          chains.push([aopKey, methodNameMagic]);
        }
      }
    }
    host.__aopChainsKey__[chainsKey] = chains;
    return chains;
  }

  private __composeForPropAdapter = (_context, chain) => {
    const [aopKey, methodName] = chain;
    // ProxyMagic
    if (aopKey === ProxyMagic) return null;
    // chain
    const aop = this._getBeanSyncOnly(aopKey);
    if (!aop) throw new Error(`aop not found: ${chain}`);
    if (!aop[methodName]) return null;
    return {
      receiver: aop,
      fn: aop[methodName],
    };
  };

  private __composeForProp(chains) {
    return compose(chains, this.__composeForPropAdapter);
  }

  private __composeForPropAsync(chains) {
    return composeAsync(chains, this.__composeForPropAdapter);
  }

  private __recordProp(recordProp, fullName: string | undefined, beanInstance, throwError: boolean) {
    if (this[BeanContainerInstances][recordProp] && throwError) {
      throw new Error(`prop exsits: ${recordProp.toString()}, ${fullName}`);
    }
    if (!this[BeanContainerInstances][recordProp]) {
      this[BeanContainerInstances][recordProp] = beanInstance;
    }
  }
}

function __checkAopOfDescriptorInfo(descriptorInfo) {
  if (!descriptorInfo) return true;
  return !descriptorInfo.dynamic && !descriptorInfo.ofBeanBase;
}

function __getPropertyDescriptor(obj, prop) {
  // dynamic
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor) return { descriptor, dynamic: true };
  // static
  return __getPropertyDescriptorStatic(obj, prop);
}

function __getPropertyDescriptorStatic(obj, prop) {
  let proto = Object.getPrototypeOf(obj);
  let ofBeanBase = false;
  while (proto) {
    if (proto.constructor.name === BeanBase.name) {
      ofBeanBase = true;
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor) return { descriptor, dynamic: false, ofBeanBase };
    proto = Object.getPrototypeOf(proto);
  }
  return null;
}

function __setPropertyValue(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return value;
    },
  });
}

function __hasMagicMothod(instance) {
  return !!instance.__get__ || !!instance.__set__;
}

function __isInnerMethod(prop) {
  return [
    '__get__',
    '__set__',
    '__init__',
    '__dispose__',
    'then',
    '__v_skip',
    '__v_isReactive',
    '__v_isReadonly',
    '__v_isShallow',
    '__v_raw',
    '__v_isRef',
    '__v_isVNode',
    '__v_cache',
    '__v_isShallow_patch',
  ].includes(prop);
}

function __methodTypeOfDescriptor(descriptorInfo) {
  if (!descriptorInfo) return null;
  const { descriptor, dynamic } = descriptorInfo;
  if (dynamic) return null;
  if (descriptor.get) return null;
  const methodType = descriptor.value?.constructor?.name;
  if (['Function', 'AsyncFunction'].includes(methodType)) {
    return methodType;
  }
  return null;
}
