export default {
  bean: 'create.data',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Data Bean',
    usage: 'zova :create:data dataName [--module=]',
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
        dataName: {
          type: 'input',
          message: 'dataName',
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
