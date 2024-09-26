module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    if (ast.includes('export interface Slots')) throw new Error('Slots exists');
    const matchController = ast.match(/export class ([^< ]*)(.*?) extends/);
    // const className = matchController[1];
    const hasGeneric = !!matchController[2];
    const genericT = hasGeneric ? '<T>' : '';
    const genericT2 = hasGeneric ? '<_T>' : '';
    const hasProps = ast.includes('export interface Props');
    // Props
    if (hasProps) {
      ast = ast.replace(/PropsBase<(.*?)> \{/, (_, $1) => {
        const parts = $1.split(',');
        parts[1] = ` Slots${genericT}`;
        return `PropsBase<${parts.join(',')}> {`;
      });
    }
    // Slots
    ast = ast.replace('@Local', `export interface Slots${genericT2} {}\n\n@Local`);
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<(.*?)> \{/, (_, $1) => {
      const parts = $1.split(',');
      if (!parts[1]) parts[1] = ' unknown';
      if (!parts[2]) parts[2] = ' unknown';
      parts[3] = ` Slots${genericT}`;
      return `BeanControllerBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
