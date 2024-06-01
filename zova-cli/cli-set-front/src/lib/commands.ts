import defaultList from './command/default.list.js';
import createProject from './command/create.project.js';
import createComponent from './command/create.component.js';
import createStore from './command/create.store.js';
import createLocal from './command/create.local.js';
import createModule from './command/create.module.js';
import createPage from './command/create.page.js';
import createSuite from './command/create.suite.js';
import toolsIcons from './command/tools.icons.js';

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
    store: createStore,
    local: createLocal,
  },
  tools: {
    icons: toolsIcons,
  },
};
