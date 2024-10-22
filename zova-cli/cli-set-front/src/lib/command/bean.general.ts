export default {
  bean: 'bean.general',
  info: {
    version: '5.0.0',
    title: 'Cli: Create General Bean',
    usage: 'zova :bean:general beanName [--module=]',
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
        beanName: {
          type: 'input',
          message: 'beanName',
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
