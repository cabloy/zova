module.exports = {
  file: 'style.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast, argv }) {
    const res = ast.match(/import {.*? Use[ ,].*?} from 'zova';/);
    if (!res) {
      ast = ast.replace(" } from 'zova';", ", Use } from 'zova';");
    }
    ast = ast
      .replace(
        "import { ScopeModule } from '../../.metadata/this.js';",
        `import { ScopeModule } from '../../.metadata/this.js';\nimport { ${argv.styleNameCapitalize} } from './${argv.styleName}.js';`,
      )
      .replace(
        'extends BeanStyleBase<ScopeModule> {',
        `extends BeanStyleBase<ScopeModule> {\n  @Use()\n  $$$$${argv.styleName}: ${argv.styleNameCapitalize};\n`,
      );
    // ok
    return ast;
  },
};
