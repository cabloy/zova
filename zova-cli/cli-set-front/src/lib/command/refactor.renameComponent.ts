export default {
  bean: 'refactor.renameComponent',
  info: {
    version: '5.0.0',
    title: 'Cli: Refactor: Rename Component',
    usage: 'zova :refactor:renameComponent componentName componentNameNew [--module=]',
  },
  options: {
    module: {
      description: 'module name',
      type: 'string',
    },
  },
  groups: {
    default: {
      questions: {
        componentName: {
          type: 'input',
          message: 'componentName',
          initial: {
            expression: 'context.argv._[0]',
          },
          required: true,
        },
        componentNameNew: {
          type: 'input',
          message: 'componentNameNew',
          initial: {
            expression: 'context.argv._[1]',
          },
          required: true,
        },
        module: {
          type: 'input',
          message: 'module name',
          required: true,
        },
      },
    },
  },
};
