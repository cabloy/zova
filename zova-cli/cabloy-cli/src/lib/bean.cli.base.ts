import { glob } from '@cabloy/module-glob';
import { LocalConsole } from './local.console.js';
import { LocalHelper } from './local.helper.js';
import { LocalTemplate } from './local.template.js';
import { CmdOptions } from '../types/argv.js';
import { TypeProjectMode } from '@cabloy/module-info';

export class BeanCliBase {
  options: CmdOptions;
  terminal: any;
  __console: LocalConsole;
  __helper: LocalHelper;
  __template: LocalTemplate;
  modulesMeta: Awaited<ReturnType<typeof glob>>;

  constructor(options: CmdOptions) {
    this.options = options;
    this.terminal = options.terminal !== false;
  }

  get console(): LocalConsole {
    if (!this.__console) {
      this.__console = new LocalConsole(this);
    }
    return this.__console;
  }

  get helper(): LocalHelper {
    if (!this.__helper) {
      this.__helper = new LocalHelper(this);
    }
    return this.__helper;
  }

  get template(): LocalTemplate {
    if (!this.__template) {
      this.__template = new LocalTemplate(this);
    }
    return this.__template;
  }

  get context() {
    return this.options.context;
  }

  get cliFullName() {
    return this.options.context.argv.cliFullName;
  }

  async meta(): Promise<any> {
    await this._loadModulesMeta();
    const metaLocale = this._commandMeta();
    return metaLocale;
  }

  async execute(): Promise<any> {
    await this._loadModulesMeta();
  }

  async _loadModulesMeta(projectMode?: TypeProjectMode) {
    //
    if (this.modulesMeta) return;
    //
    if (!projectMode) {
      if (this.cliFullName.indexOf('api:') === 0) {
        projectMode = 'api';
      } else if (this.cliFullName.indexOf('front:') === 0) {
        projectMode = 'zova';
      }
    }
    if (!projectMode) return;
    // all modules
    this.modulesMeta = await glob({
      projectPath: this.context.argv.projectPath,
      disabledModules: undefined,
      disabledSuites: undefined,
      log: false,
      projectMode,
    });
  }

  _commandMeta() {
    const { command } = this.options;
    const { argv } = this.context;
    const meta: any = {};
    meta.info = this._commandMeta_info({ info: command.info, argv });
    meta.options = this._commandMeta_options({ options: command.options, argv });
    meta.groups = this._commandMeta_groups({ groups: command.groups, argv });
    return meta;
  }

  _commandMeta_groups({ groups }: any) {
    const metaGroups: any = {};
    if (groups) {
      for (const groupName in groups) {
        const group = groups[groupName];
        metaGroups[groupName] = this._commandMeta_group({ group });
      }
    }
    return metaGroups;
  }

  _commandMeta_group({ group }: any) {
    const metaGroup = {
      description: group.description,
      condition: group.condition,
      questions: {},
    };
    for (const key in group.questions) {
      const question = group.questions[key];
      metaGroup.questions[key] = {
        ...question,
        message: question.message,
      };
    }
    return metaGroup;
  }

  _commandMeta_options({ options }: any) {
    const metaOptions: any = {};
    if (options) {
      for (const key in options) {
        const option = options[key];
        metaOptions[key] = {
          ...option,
          description: option.description,
        };
      }
    }
    return metaOptions;
  }

  _commandMeta_info({ info, argv }: any) {
    // info
    const metaInfo: any = {
      version: info.version,
      title: info.title,
      usage: info.usage,
    };
    // usage
    if (!metaInfo.usage) {
      metaInfo.usage = `${'Usage'}: zova ${argv.cliFullName} [options] [-h] [-v]`;
    }
    // welcomes
    metaInfo.welcomes = this._commandMeta_info_welcomes({ info });
    // ok
    return metaInfo;
  }

  _commandMeta_info_welcomes({ info }: any) {
    let welcomes = info.welcomes || [];
    if (!Array.isArray(welcomes)) welcomes = [welcomes];
    welcomes = welcomes.map(item => item);
    return welcomes;
  }
}
