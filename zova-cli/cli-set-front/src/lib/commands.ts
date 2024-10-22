import defaultList from './command/default.list.js';
import createProject from './command/create.project.js';
import createComponent from './command/create.component.js';
import beanGeneral from './command/bean.general.js';
import beanStore from './command/bean.store.js';
import beanModel from './command/bean.model.js';
import beanStyle from './command/bean.style.js';
import beanTheme from './command/bean.theme.js';
import beanTool from './command/bean.tool.js';
import beanLocal from './command/bean.local.js';
import createService from './command/create.service.js';
import createMock from './command/create.mock.js';
import createModule from './command/create.module.js';
import createPage from './command/create.page.js';
import createSuite from './command/create.suite.js';
import initIcon from './command/init.icon.js';
import initConfig from './command/init.config.js';
import initConstant from './command/init.constant.js';
import initLocale from './command/init.locale.js';
import initError from './command/init.error.js';
import initLegacy from './command/init.legacy.js';
import initMonkey from './command/init.monkey.js';
import refactorPageQuery from './command/refactor.pageQuery.js';
import refactorPageParams from './command/refactor.pageParams.js';
import refactorComponentGeneric from './command/refactor.componentGeneric.js';
import refactorAnotherRender from './command/refactor.anotherRender.js';
import refactorAnotherStyle from './command/refactor.anotherStyle.js';
import refactorComponentProps from './command/refactor.componentProps.js';
import refactorComponentEmits from './command/refactor.componentEmits.js';
import refactorComponentSlots from './command/refactor.componentSlots.js';
import refactorComponentModel from './command/refactor.componentModel.js';
import refactorRenameComponent from './command/refactor.renameComponent.js';
// import toolsIcon from './command/tools.icon.js';
import toolsMetadata from './command/tools.metadata.js';
import toolsDeps from './command/tools.deps.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    project: createProject,
    suite: createSuite,
    module: createModule,
    page: createPage,
    component: createComponent,
    service: createService,
    mock: createMock,
  },
  bean: {
    general: beanGeneral,
    store: beanStore,
    model: beanModel,
    style: beanStyle,
    theme: beanTheme,
    tool: beanTool,
    local: beanLocal,
  },
  init: {
    icon: initIcon,
    config: initConfig,
    constant: initConstant,
    locale: initLocale,
    error: initError,
    legacy: initLegacy,
    monkey: initMonkey,
  },
  refactor: {
    pageQuery: refactorPageQuery,
    pageParams: refactorPageParams,
    componentGeneric: refactorComponentGeneric,
    anotherRender: refactorAnotherRender,
    anotherStyle: refactorAnotherStyle,
    componentProps: refactorComponentProps,
    componentEmits: refactorComponentEmits,
    componentSlots: refactorComponentSlots,
    componentModel: refactorComponentModel,
    renameComponent: refactorRenameComponent,
  },
  tools: {
    // icon: toolsIcon,
    metadata: toolsMetadata,
    deps: toolsDeps,
  },
};
