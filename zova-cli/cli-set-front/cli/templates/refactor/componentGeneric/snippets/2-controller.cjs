module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ cli, ast }) {
    if (ast.includes('export interface Props<')) return;
    const matchController = ast.match(/export class (.*?) extends/);
    const className = matchController[1];
    const hasSlots = ast.includes('export interface Slots');
    ast = ast
      .replace('export interface Props', `export interface Props${hasSlots ? '<T>' : '<_T>'}`)
      .replace(`${className}, Slots`, `${className}<T>, Slots<T>`)
      .replace('export type Emits', 'export type Emits<_T>')
      .replace('export interface Slots', 'export interface Slots<_T>')
      .replace(`export class ${className}`, `export class ${className}<T = unknown>`);
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<([\s\S]*?)> \{/, (_, $1) => {
      const parts = cli.helper.safeSplit($1, ',');
      if (parts[1]?.includes('Props')) parts[1] = parts[1].replace('Props', 'Props<T>');
      if (parts[2]?.includes('Emits')) parts[2] = parts[2].replace('Emits', 'Emits<T>');
      if (parts[3]?.includes('Slots')) parts[3] = parts[3].replace('Slots', 'Slots<T>');
      return `BeanControllerBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
