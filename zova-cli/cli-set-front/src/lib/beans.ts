import { CliDefaultList } from './bean/cli.default.list.js';
import { CliCreateProject } from './bean/cli.create.project.js';
import { CliCreateComponent } from './bean/cli.create.component.js';
import { CliBeanGeneral } from './bean/cli.bean.general.js';
import { CliBeanStore } from './bean/cli.bean.store.js';
import { CliBeanModel } from './bean/cli.bean.model.js';
import { CliBeanStyle } from './bean/cli.bean.style.js';
import { CliBeanTheme } from './bean/cli.bean.theme.js';
import { CliBeanTool } from './bean/cli.bean.tool.js';
import { CliBeanLocal } from './bean/cli.bean.local.js';
import { CliCreateService } from './bean/cli.create.service.js';
import { CliCreateMock } from './bean/cli.create.mock.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreatePage } from './bean/cli.create.page.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliToolsIcon } from './bean/cli.tools.icon.js';
import { CliToolsMetadata } from './bean/cli.tools.metadata.js';
import { CliToolsDeps } from './bean/cli.tools.deps.js';
import { CliInitIcon } from './bean/cli.init.icon.js';
import { CliInitConfig } from './bean/cli.init.config.js';
import { CliInitConstant } from './bean/cli.init.constant.js';
import { CliInitLocale } from './bean/cli.init.locale.js';
import { CliInitError } from './bean/cli.init.error.js';
import { CliInitLegacy } from './bean/cli.init.legacy.js';
import { CliInitMonkey } from './bean/cli.init.monkey.js';
import { CliRefactorPageQuery } from './bean/cli.refactor.pageQuery.js';
import { CliRefactorPageParams } from './bean/cli.refactor.pageParams.js';
import { CliRefactorComponentGeneric } from './bean/cli.refactor.componentGeneric.js';
import { CliRefactorAnotherRender } from './bean/cli.refactor.anotherRender.js';
import { CliRefactorAnotherStyle } from './bean/cli.refactor.anotherStyle.js';
import { CliRefactorComponentProps } from './bean/cli.refactor.componentProps.js';
import { CliRefactorComponentEmits } from './bean/cli.refactor.componentEmits.js';
import { CliRefactorComponentSlots } from './bean/cli.refactor.componentSlots.js';
import { CliRefactorComponentModel } from './bean/cli.refactor.componentModel.js';
import { CliRefactorRenameComponent } from './bean/cli.refactor.renameComponent.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.project': CliCreateProject,
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
  'create.page': CliCreatePage,
  'create.component': CliCreateComponent,
  'create.service': CliCreateService,
  'create.mock': CliCreateMock,
  'bean.general': CliBeanGeneral,
  'bean.store': CliBeanStore,
  'bean.model': CliBeanModel,
  'bean.style': CliBeanStyle,
  'bean.theme': CliBeanTheme,
  'bean.tool': CliBeanTool,
  'bean.local': CliBeanLocal,
  'init.icon': CliInitIcon,
  'init.config': CliInitConfig,
  'init.constant': CliInitConstant,
  'init.locale': CliInitLocale,
  'init.error': CliInitError,
  'init.legacy': CliInitLegacy,
  'init.monkey': CliInitMonkey,
  'refactor.pageQuery': CliRefactorPageQuery,
  'refactor.pageParams': CliRefactorPageParams,
  'refactor.componentGeneric': CliRefactorComponentGeneric,
  'refactor.anotherRender': CliRefactorAnotherRender,
  'refactor.anotherStyle': CliRefactorAnotherStyle,
  'refactor.componentProps': CliRefactorComponentProps,
  'refactor.componentEmits': CliRefactorComponentEmits,
  'refactor.componentSlots': CliRefactorComponentSlots,
  'refactor.componentModel': CliRefactorComponentModel,
  'refactor.renameComponent': CliRefactorRenameComponent,
  'tools.icon': CliToolsIcon,
  'tools.metadata': CliToolsMetadata,
  'tools.deps': CliToolsDeps,
};
