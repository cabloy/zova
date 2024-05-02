import { CliCreateProject } from './bean/cli.create.project.js';
import { CliCreateComponent } from './bean/cli.create.component.js';
import { CliCreateStore } from './bean/cli.create.store.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreatePage } from './bean/cli.create.page.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliToolsIcons } from './bean/cli.tools.icons.js';

export const beans = {
  'create.project': CliCreateProject,
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
  'create.page': CliCreatePage,
  'create.component': CliCreateComponent,
  'create.store': CliCreateStore,
  'tools.icons': CliToolsIcons,
};
