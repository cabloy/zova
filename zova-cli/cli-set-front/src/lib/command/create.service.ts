export default {
  bean: 'create.service',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Service',
    usage: 'zova :create:service serviceName [--module=]',
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
        serviceName: {
          type: 'input',
          message: 'serviceName',
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
