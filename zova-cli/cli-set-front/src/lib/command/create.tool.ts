export default {
  bean: 'create.tool',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Tool Bean',
    usage: 'zova :create:tool toolName [--module=]',
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
        toolName: {
          type: 'input',
          message: 'toolName',
          initial: {
            expression: 'context.argv._[0]',
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
