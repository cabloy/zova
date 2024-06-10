export default {
  bean: 'create.style',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Style Bean',
    usage: 'zova :create:style styleName [--module=]',
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
        styleName: {
          type: 'input',
          message: 'styleName',
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
