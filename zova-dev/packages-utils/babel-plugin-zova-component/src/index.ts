import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
//import { parseInfoFromPath } from '@cabloy/module-info';

const JSXVisitor = {
  JSXOpeningElement(_path: NodePath<t.JSXOpeningElement>) {
    //console.log('Visiting: ' + path.node.name);
  },
};

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(path: NodePath<t.Program>) {
      // import
      findImports(path);
      // jsx
      path.traverse(JSXVisitor);
    },
  };
  return { visitor };
}

function findImports(path: NodePath<t.Program>) {
  for (const node of path.node.body) {
    if (!t.isImportDeclaration(node) || !node.source.value.startsWith('zova-module-')) continue;
    for (const specifier of node.specifiers) {
      if (!t.isImportSpecifier(specifier) || specifier.importKind !== 'value' || !t.isIdentifier(specifier.imported)) {
        continue;
      }
      const specifierName = specifier.imported.name;
      console.log(specifierName);
    }
  }
}
