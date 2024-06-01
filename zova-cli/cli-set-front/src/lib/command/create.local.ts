export default {
  bean: 'create.local',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Local Bean',
    usage: 'zova :create:local localName [--module=]',
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
        localName: {
          type: 'input',
          message: 'localName',
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
