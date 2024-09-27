module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ cli, ast, argv }) {
    const modelName = argv.modelName;
    const localName = modelName === 'modelValue' ? modelName : `model${cli.helper.firstCharToUpperCase(modelName)}`;
    const eventName = `update:${modelName}`;
    if (ast.includes(`e: '${eventName}'`)) throw new Error('Model exists');
    // Props
    ast = ast.replace(/export interface Props([^\{]*) \{/, $0 => {
      return `${$0}\n  ${modelName}: number;`;
    });
    // Emits
    ast = ast.replace(/export type Emits([^\{]*) = \{/, $0 => {
      return `${$0}\n  (e: '${eventName}', value: number);`;
    });
    // propsDefault
    ast = ast.replace(/static $propsDefault([^\{]*) = \{/, $0 => {
      return `${$0}\n  ${modelName}: 0,`;
    });
    // localName
    ast = ast.replace(/protected async __init__/, $0 => {
      return `${localName}: number;\n\n    ${$0}`;
    });
    ast = ast.replace(/protected async __init__([^\{]*) \{/, $0 => {
      return `${$0}\n      this.${localName} = this.$useModel(${modelName === 'modelValue' ? '' : modelName});`;
    });
    // ok
    return ast;
  },
};
