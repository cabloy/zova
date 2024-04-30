module.exports = {
  file: 'package.json',
  parseOptions: {
    language: 'json',
  },
  async transform({ /* cli,*/ ast, argv }) {
    ast.dependencies[`cabloy-module-front-${argv.name}`] = 'workspace:^';
    // ok
    return ast;
  },
};
