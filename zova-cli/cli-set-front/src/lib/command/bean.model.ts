export default {
  bean: 'bean.model',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Model Bean',
    usage: 'zova :bean:Model modelName [--module=]',
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
        modelName: {
          type: 'input',
          message: 'modelName',
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
