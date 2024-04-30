module.exports = {
  file: 'tsconfig.json',
  parseOptions: {
    language: 'json',
  },
  async transform({ /* cli,*/ ast, argv }) {
    ast.references.push({
      path: `modules/${argv.moduleInfo.relativeName}/tsconfig.build.json`,
    });
    // ok
    return ast;
  },
};
