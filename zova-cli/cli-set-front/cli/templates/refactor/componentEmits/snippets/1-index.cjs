module.exports = {
  file: 'index.vue',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes(', Emits')) throw new Error('Emits exists');
    //
    const hasGeneric = ast.match(/<script[^/]*?generic="[^"]*?"[^/]*?>/);
    const genericT = hasGeneric ? '<T>' : '';
    //
    ast = ast
      .replace(/import \{ ([^\}]*) \} from '.\/controller.js';/, (_, $1) => {
        return `import { ${$1}, Emits } from './controller.js';`;
      })
      .replace('useController(', `const emit = defineEmits<Emits${genericT}>();\nuseController(`)
      .replace('useController(props, undefined,', 'useController(props, emit,');
    // ok
    return ast;
  },
};
