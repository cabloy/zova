export default {
  bean: 'bean.store',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Store Bean',
    usage: 'zova :bean:store storeName [--module=]',
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
        storeName: {
          type: 'input',
          message: 'storeName',
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
