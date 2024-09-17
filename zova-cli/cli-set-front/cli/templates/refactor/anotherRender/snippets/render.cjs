module.exports = {
  file: 'render.tsx',
  parseOptions: { language: 'plain' },
  async transform({ ast, argv }) {
    const res = ast.match(/import {.*? Use[ ,].*?} from 'zova';/);
    if (!res) {
      ast = ast.replace(" } from 'zova';", ", Use } from 'zova';");
    }
    ast = ast
      .replace(
        "import { ScopeModule } from '../../.metadata/this.js';",
        `import { ScopeModule } from '../../.metadata/this.js';\nimport { ${argv.renderNameCapitalize} } from './${argv.renderName}.jsx';`,
      )
      .replace(
        'extends BeanRenderBase<ScopeModule> {',
        `extends BeanRenderBase<ScopeModule> {\n  @Use()\n  $$$$${argv.renderName}: ${argv.renderNameCapitalize};\n`,
      );
    // ok
    return ast;
  },
};
