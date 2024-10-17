module.exports = {
  file: 'controller.ts',
  parseOptions: { language: 'plain' },
  async transform({ cli, ast }) {
    if (ast.includes('export type Emits')) throw new Error('Emits exists');
    const matchController = ast.match(/export class ([^< ]*)(.*?) extends/);
    // const className = matchController[1];
    const hasGeneric = !!matchController[2];
    const genericT = hasGeneric ? '<T>' : '';
    const genericT2 = hasGeneric ? '<_T>' : '';
    //
    ast = ast.replace('@Local', `export type Emits${genericT2} = {};\n\n@Local`);
    // BeanControllerBase
    ast = ast.replace(/BeanControllerBase<([\s\S]*?)> \{/, (_, $1) => {
      const parts = cli.helper.safeSplit($1, ',');
      if (!parts[1]) parts[1] = ' unknown';
      parts[2] = ` Emits${genericT}`;
      return `BeanControllerBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
