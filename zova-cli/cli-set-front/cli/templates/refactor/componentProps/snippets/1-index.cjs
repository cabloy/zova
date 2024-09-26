module.exports = {
  file: 'index.vue',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (!ast.includes(', PropsBase')) throw new Error('Props exists');
    //
    const hasGeneric = ast.match(/<script[^/]*?generic="[^"]*?"[^/]*?>/);
    const genericT = hasGeneric ? '<T>' : '';
    //
    const matchController = ast.match(/import \{ (Controller[^, ]*)/);
    const className = matchController[1];
    ast = ast
      .replace(', PropsBase', '')
      .replace(/import \{ ([^\}]*) \} from '.\/controller.js';/, (_, $1) => {
        return `import { ${$1}, Props } from './controller.js';`;
      })
      .replace(
        /const props = [^;]*;/,
        `const props = withDefaults(defineProps<Props${genericT}>(), ${className}.$propsDefault);`,
      );
    // ok
    return ast;
  },
};
