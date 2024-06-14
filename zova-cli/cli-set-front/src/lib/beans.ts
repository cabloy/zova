import { CliDefaultList } from './bean/cli.default.list.js';
import { CliCreateProject } from './bean/cli.create.project.js';
import { CliCreateComponent } from './bean/cli.create.component.js';
import { CliCreateStore } from './bean/cli.create.store.js';
import { CliCreateStyle } from './bean/cli.create.style.js';
import { CliCreateTheme } from './bean/cli.create.theme.js';
import { CliCreateTool } from './bean/cli.create.tool.js';
import { CliCreateLocal } from './bean/cli.create.local.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreatePage } from './bean/cli.create.page.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliToolsIcons } from './bean/cli.tools.icons.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.project': CliCreateProject,
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
  'create.page': CliCreatePage,
  'create.component': CliCreateComponent,
  'create.store': CliCreateStore,
  'create.style': CliCreateStyle,
  'create.theme': CliCreateTheme,
  'create.tool': CliCreateTool,
  'create.local': CliCreateLocal,
  'tools.icons': CliToolsIcons,
};
