module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes('export interface Props<')) return;
    const matchController = ast.match(/export class ([^< ]*)(.*?) extends/);
    const className = matchController[1];
    const hasGeneric = !!matchController[2];
    const genericT = hasGeneric ? '<T>' : '';
    const genericT2 = hasGeneric ? '<_T>' : '';
    const hasSlots = ast.includes('export interface Slots');
    ast = ast
      .replace('export interface Props', `export interface Props${hasSlots ? genericT : genericT2}`)
      .replace(`${className}, Slots`, `${className}<T>, Slots<T>`)
      .replace('export type Emits', 'export type Emits<_T>')
      .replace('export interface Slots', 'export interface Slots<_T>')
      .replace(`export class ${className}`, `export class ${className}<T = unknown>`);
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<(.*?)> \{/, (_, $1) => {
      const parts = $1.split(',');
      if (parts[1] === ' Props') parts[1] = ' Props<T>';
      if (parts[2] === ' Emits') parts[2] = ' Emits<T>';
      if (parts[3] === ' Slots') parts[3] = ' Slots<T>';
      return `BeanControllerBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
