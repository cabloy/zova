export default {
  bean: 'create.suite',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Suite',
    usage: 'zova :create:suite suiteName',
  },
  options: {},
  groups: {
    suiteInfo: {
      questions: {
        name: {
          type: 'input',
          message: 'suite name',
          initial: {
            expression: 'context.argv._[0]',
          },
          required: true,
        },
        description: {
          type: 'input',
          message: 'suite description',
        },
        author: {
          type: 'input',
          message: 'suite author',
        },
      },
    },
  },
};
