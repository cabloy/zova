import {
  BeanBase,
  BeanContainer,
  BeanControllerPageBase,
  BeanSimple,
  IModule,
  IMonkeyModule,
  IMonkeyController,
  IControllerData,
  TypePageSchema,
  useComputed,
  IMonkeyAppInitialize,
  IMonkeyAppInitialized,
  IMonkeyAppReady,
} from 'zova';
import * as ModuleInfo from '@cabloy/module-info';
import { useRoute } from 'vue-router';
import { BeanRouter } from './bean/bean.router.js';
import { getRealRouteName } from './utils.js';
import { LocalRouter } from './bean/local.router.js';

export class Monkey
  extends BeanSimple
  implements IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyModule, IMonkeyController
{
  private _moduleSelf: IModule;
  private _beanRouter: BeanRouter;
  localRouter: LocalRouter;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getBeanRouter() {
    if (!this._beanRouter) {
      this._beanRouter = (await this.bean._getBean('a-router.bean.router', false)) as BeanRouter;
      await this._beanRouter.initialize(true);
    }
    return this._beanRouter;
  }

  async appInitialize() {
    // router
    this.localRouter = await this.bean._newBean(LocalRouter, false);
  }
  async appInitialized() {
    // emit event
    await this.app.meta.event.emit('a-router:routerGuards', this._beanRouter);
  }
  async appReady() {
    // use router
    this.app.vue.use(this._beanRouter);
    // ssr
    if (process.env.SERVER) {
      // push
      const url = this.ctx.meta.ssr.context.req.url;
      this._beanRouter.push(url);
      await this._beanRouter.isReady();
    } else if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      await this._beanRouter.isReady();
    }
  }
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$router', {
      enumerable: false,
      configurable: true,
      get() {
        return bean._getBeanFromHost('a-router.bean.router');
      },
    });
  }
  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const beanRouter = await this.getBeanRouter();
    beanRouter._registerRoutes(module);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  controllerDataPrepare(controllerData: IControllerData) {
    controllerData.context.route = useRoute();
  }
  controllerDataInit(controllerData: IControllerData, controller: BeanBase) {
    // only for controller page
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = controllerData.context.route;
    if (!route) return;
    const routeName = getRealRouteName(route.name);
    const schemaKey = routeName || String(route.path);
    let schemas: TypePageSchema | undefined;
    const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(schemaKey));
    if (!moduleInfo) {
      // do nothing
      return;
    }
    if (!this.app.meta.module.exists(moduleInfo.relativeName)) {
      // do nothing
      return;
    }
    const module = this.app.meta.module.get(moduleInfo.relativeName)!;
    if (routeName) {
      schemas = module.resource.pageNameSchemas?.[schemaKey];
    } else {
      schemas = module.resource.pagePathSchemas?.[schemaKey];
    }
    controller.$params = useComputed(() => {
      if (!schemas?.params) throw new Error(`page params schema not found: ${schemaKey}`);
      return schemas.params.parse(route.params);
    });
    controller.$query = useComputed(() => {
      if (!schemas?.query) throw new Error(`page query schema not found: ${schemaKey}`);
      return schemas.query.parse(route.query);
    });
  }
}
