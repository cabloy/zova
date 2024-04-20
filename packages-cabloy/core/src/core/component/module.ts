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

  get<K extends TypeBeanScopeRecordKeys>(moduleName: K): IModule;
  get(moduleName: string): IModule;
  get(moduleName: IModuleInfo): IModule;
  get(moduleName: string | IModuleInfo): IModule {
    // module info
    if (!moduleName) return undefined as unknown as IModule;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // get
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      // module not loaded, so async use to raise the next call
      this.use(moduleInfo.relativeName);
    }
    return module;
  }

  getOnly<K extends TypeBeanScopeRecordKeys>(moduleName: K): IModule;
  getOnly(moduleName: string): IModule;
  getOnly(moduleName: IModuleInfo): IModule;
  getOnly(moduleName: string | IModuleInfo): IModule {
    // module info
    if (!moduleName) return undefined as unknown as IModule;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // get
    return this.modules[moduleInfo.relativeName];
  }

  async use<K extends TypeBeanScopeRecordKeys>(moduleName: K): Promise<IModule>;
  async use(moduleName: string): Promise<IModule>;
  async use(moduleName: IModuleInfo): Promise<IModule>;
  async use(moduleName?: string | IModuleInfo): Promise<IModule> {
    // module info
    if (!moduleName) throw new Error('should specify the module name');
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // try get
    const relativeName = moduleInfo.relativeName;
    const module = this.get(relativeName);
    if (module) return module;
    // promise
    const moduleRepo = this.modulesMeta.async[relativeName];
    if (!moduleRepo) throw new Error(`module not exists: ${relativeName}`);
    const moduleResource = moduleRepo.resource as any;
    // load
    moduleRepo.resource = await moduleResource();
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
  }

  private async _installInner(moduleName: string, module: IModule) {
    // main / monkey
    if (module.resource.Main) {
      module.mainInstance = await this.app.bean._newBean(module.resource.Main);
    }
    if (module.resource.Monkey) {
      module.monkeyInstance = await this.app.bean._newBean(module.resource.Monkey);
    }
    // monkey: moduleLoading
    await this._monkeyModule('moduleLoading', module);
    // register routes
    this._registerRoutes(module);
    // register resources
    await this._registerResources(module);
    // scope
    await this.app.bean._getBean(`${moduleName}.scope.module`, false);
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
    const path = `/${module.info.pid}/${module.info.name}/${route.path}`;
    const component = route.component;
    this.app.view.router.addRoute({ path, component });
  }

  /** @internal */
  public async _monkeyModule(monkeyName: TypeMonkeyName, moduleTarget?: IModule, ...monkeyData: any[]) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      await moduleTarget.mainInstance[monkeyName](moduleTarget, ...monkeyData);
    }
    // module monkey
    for (const key in this.modulesMeta.monkey) {
      const moduleMonkey: IModule = this.modulesMeta.monkey[key];
      if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
        // @ts-ignore ignore
        await moduleMonkey.monkeyInstance[monkeyName](moduleMonkey, moduleTarget, ...monkeyData);
      }
    }
    // app monkey
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      // @ts-ignore ignore
      await appMonkey[monkeyName](moduleTarget, ...monkeyData);
    }
  }
}
