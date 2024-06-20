import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { parseInfoFromPath } from '@cabloy/module-info';

const __Decorator_Supported = ['Bean', 'Local', 'Scope', 'Store', 'Data', 'Style', 'Theme', 'Tool', 'Virtual'];

export default function () {
  const visitor: Visitor<PluginPass> = {
    ClassDeclaration(path: NodePath<t.ClassDeclaration>, state) {
      let moduleName: string | undefined;
      function getModuleName() {
        if (moduleName) return moduleName;
        const sourceFileName = state.file.opts.sourceFileName || state.file.opts.filename;
        const moduleInfo = parseInfoFromPath(sourceFileName);
        if (!moduleInfo) return;
        moduleName = moduleInfo.relativeName;
        return moduleName;
      }
      const decorators = path.node.decorators;
      if (!decorators || decorators.length === 0) return;
      for (const decorator of decorators) {
        if (t.isCallExpression(decorator.expression)) {
          const expression: t.CallExpression = decorator.expression;
          const decoratorName = (<any>expression.callee).name;
          if (__Decorator_Supported.includes(decoratorName)) {
            const moduleName = getModuleName();
            if (moduleName) {
              __applyDecorator(expression, moduleName);
            }
          }
        }
      }
    },
  };
  return { visitor };
}

function __applyDecorator(expression: t.CallExpression, moduleName: string) {
  const propertyNode = t.objectProperty(t.identifier('module'), t.stringLiteral(moduleName));
  const args = expression.arguments;
  if (args.length === 0) {
    const objectExpression = t.objectExpression([propertyNode]);
    args.push(objectExpression);
  } else {
    const objectExpression = args[0] as t.ObjectExpression;
    objectExpression.properties.push(propertyNode);
  }
}
