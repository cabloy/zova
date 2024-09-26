const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;
const __snippet_type = '@Local() export class $_$0 extends $_$1<$$$1> {$$$2}';

module.exports = {
  file: 'index.vue',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    const hasGeneric = ast.match(/<script[^/]*?generic="[^"]*?"[^/]*?>/);
    if (hasGeneric) throw new Error('Generic exists');
    ast = ast
      .replace('<script setup lang="ts">', '<script setup lang="ts" generic="T">')
      .replace('defineProps<Props>', 'defineProps<Props<T>>')
      .replace('defineEmits<Emits>', 'defineEmits<Emits<T>>');
    // ok
    return ast;
  },
};
