module.exports = {
  file: 'index.vue',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    const hasGeneric = ast.match(/<script[^/]*?generic="[^"]*?"[^/]*?>/);
    if (hasGeneric) throw new Error('Generic exists');
    ast = ast
      .replace('<script setup lang="ts">', '<script setup lang="ts" generic="T">')
      .replace('defineProps<Props>', 'defineProps<Props<T>>')
      .replace('PartialSome<Props', 'PartialSome<Props<T>')
      .replace('defineEmits<Emits>', 'defineEmits<Emits<T>>');
    // ok
    return ast;
  },
};
