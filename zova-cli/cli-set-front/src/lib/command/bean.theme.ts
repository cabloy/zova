export default {
  bean: 'bean.theme',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Theme Bean',
    usage: 'zova :bean:theme themeName [--module=]',
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
        themeName: {
          type: 'input',
          message: 'themeName',
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
