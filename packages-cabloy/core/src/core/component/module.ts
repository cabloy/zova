import { IModule, IModuleInfo } from '@cabloy/module-info';
import * as ModuleInfo from '@cabloy/module-info';
import { BeanSimple } from '../../bean/beanSimple.js';
import { PluginCabloyModulesMeta } from '../../types/interface/pluginCabloy.js';
import { IModuleRoute } from '../../bean/resource/route/type.js';
import { Component, ComponentCustomOptions, shallowReactive } from 'vue';
import { TypeMonkeyName } from '../../types/index.js';
import { StateLock } from '../../utils/stateLock.js';
import { TypeBeanScopeRecordKeys } from '../../bean/type.js';

export class AppModule extends BeanSimple {
  private modulesMeta: PluginCabloyModulesMeta;
  private modules: Record<string, IModule> = shallowReactive({});

  /** @internal */
  public async initialize(modulesMeta: PluginCabloyModulesMeta) {
    this.modulesMeta = modulesMeta;
    await this._requireAllMonkeys();
    await this._requireAllSyncs();
  }

  get<K extends TypeBeanScopeRecordKeys>(moduleName: K, forceLoad?: boolean): IModule | undefined;
  get(moduleName: string, forceLoad?: boolean): IModule | undefined;
  get(moduleName: IModuleInfo, forceLoad?: boolean): IModule | undefined;
  get(moduleName: string | IModuleInfo, forceLoad?: boolean): IModule | undefined {
    // module info
    if (!moduleName) return undefined;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // get
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      // module not loaded, so async use to raise the next call
      if (forceLoad !== false) {
        this.use(moduleInfo.relativeName);
      }
      return undefined;
    }
    if (!module.__installed__ || !module.__installed__.state) {
      return undefined;
    }
    return module;
  }

  async use<K extends TypeBeanScopeRecordKeys>(moduleName: K): Promise<IModule>;
  async use(moduleName: string): Promise<IModule>;
  async use(moduleName: IModuleInfo): Promise<IModule>;
  async use(moduleName?: string | IModuleInfo): Promise<IModule> {
    // module info
    if (!moduleName) throw new Error('should specify the module name');
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const relativeName = moduleInfo.relativeName;
    // should not try check get directly
    // const module = this.getOnly(relativeName);
    // if (module) return module;
    // module
    const moduleRepo = this.modulesMeta.modules[relativeName];
    if (!moduleRepo) throw new Error(`module not exists: ${relativeName}`);
    // install
    await this._install(relativeName, moduleRepo);
    // ok
    return moduleRepo;
  }

  private async _requireAllMonkeys() {
    for (const relativeName in this.modulesMeta.monkey) {
      await this._install(relativeName, this.modulesMeta.monkey[relativeName]);
    }
  }

  private async _requireAllSyncs() {
    for (const relativeName in this.modulesMeta.sync) {
      await this._install(relativeName, this.modulesMeta.sync[relativeName]);
    }
  }

  private async _install(moduleName: string, module: IModule) {
    if (!module.__installed__) {
      module.__installed__ = StateLock.create();
    }
    // check
    if (this.modules[moduleName]) {
      await module.__installed__.wait();
      return;
    }
    // record
    this.modules[moduleName] = module;
    // install
    await this._installInner(moduleName, module);
    // installed
    module.__installed__.touch();
    // scope: should after __installed__.touch
    await this.app.bean._getBean(`${moduleName}.scope.module`, false);
  }

  private async _installInner(_moduleName: string, module: IModule) {
    // load
    if (typeof module.resource === 'function') {
      const moduleResource = module.resource as any;
      module.resource = await moduleResource();
    }
    // main / monkey
    if (module.resource.Main) {
      module.mainInstance = this.app.bean._newBeanSimple(module.resource.Main, false, module);
    }
    if (module.resource.Monkey) {
      module.monkeyInstance = this.app.bean._newBeanSimple(module.resource.Monkey, false, module);
    }
    // monkey: moduleLoading
    await this._monkeyModule('moduleLoading', module);
    // register routes
    this._registerRoutes(module);
    // register resources
    await this._registerResources(module);
    // monkey: moduleLoaded
    await this._monkeyModule('moduleLoaded', module);
  }

  private async _registerResources(module: IModule) {
    this._registerComponents(module);
    this._registerLocales(module);
    this._registerErrors(module);
    this._registerConstants(module);
    await this._registerConfig(module);
  }

  private _registerErrors(module: IModule) {
    if (!module.resource.Errors) return;
    this.app.meta.error.errors[module.info.relativeName] = module.resource.Errors;
  }

  private _registerLocales(module: IModule) {
    if (!module.resource.locales) return;
    for (const key in module.resource.locales) {
      this.app.meta.locale.locales[key] = this.app.meta.util.extend(
        {},
        module.resource.locales[key],
        this.app.meta.locale.locales[key],
      );
    }
  }

  private _registerConstants(module: IModule) {
    if (!module.resource.constants) return;
    const relativeName = module.info.relativeName;
    this.app.constant.modules[relativeName] = this.app.meta.util.extend(
      {},
      module.resource.constants,
      this.app.constant.modules[relativeName],
    );
  }

  private async _registerConfig(module: IModule) {
    if (!module.resource.config) return;
    // config
    const config = await module.resource.config(this.app);
    // monkey
    await this._monkeyModule('configLoaded', module, config);
    // extend
    const relativeName = module.info.relativeName;
    this.app.config.modules[relativeName] = this.app.meta.util.extend(
      {},
      config,
      this.app.config.modules[relativeName],
    );
  }

  private _registerComponents(module: IModule) {
    if (!module.resource.components) return;
    for (const key in module.resource.components) {
      const component = module.resource.components[key];
      this._setComponentGlobal(component);
    }
  }

  private _setComponentGlobal(component: Component) {
    // register
    const options = component as ComponentCustomOptions;
    if (component.name && options.meta?.global === true) {
      if (!this.app.vue.component(component.name)) {
        this.app.vue.component(component.name, component);
      }
    }
    return component;
  }

  private _registerRoutes(module: IModule) {
    if (!module.resource.routes) return null;
    for (const route of module.resource.routes) {
      this._registerRoute(module, route);
    }
  }

  private _registerRoute(module: IModule, route: IModuleRoute) {
    // meta
    const meta = route.meta;
    // path
    let path: string;
    if (meta?.absolute === true) {
      path = route.path;
    } else {
      path = `/${module.info.pid}/${module.info.name}/${route.path}`;
    }
    // component
    const component = route.component;
    // layout / routeData
    let layout = meta?.layout;
    let routeData;
    if (layout === false) {
      routeData = { ...route, path, component, meta };
    } else {
      if (layout === undefined || layout === 'default') {
        layout = this.app.config.layout.component.default;
      } else if (layout === 'empty') {
        layout = this.app.config.layout.component.empty;
      }
      routeData = {
        path,
        component: this.app.meta.util.createAsyncComponent(layout as any),
        children: [{ ...route, path: '', component, meta }],
      };
    }
    // add
    this.app.view.router.addRoute(routeData);
  }

  /** @internal */
  public async _monkeyModule(monkeyName: TypeMonkeyName, moduleTarget?: IModule, ...monkeyData: any[]) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      await moduleTarget.mainInstance[monkeyName](...monkeyData);
    }
    // module monkey
    for (const key in this.modulesMeta.monkey) {
      const moduleMonkey: IModule = this.modulesMeta.monkey[key];
      if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
        if (moduleTarget === undefined) {
          // @ts-ignore ignore
          await moduleMonkey.monkeyInstance[monkeyName](...monkeyData);
        } else {
          // @ts-ignore ignore
          await moduleMonkey.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
        }
      }
    }
    // app monkey
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      if (moduleTarget === undefined) {
        // @ts-ignore ignore
        await appMonkey[monkeyName](...monkeyData);
      } else {
        // @ts-ignore ignore
        await appMonkey[monkeyName](moduleTarget, ...monkeyData);
      }
    }
  }
}
