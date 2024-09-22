import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { parseInfo } from '@cabloy/module-info';

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(path: NodePath<t.Program>) {
      // context
      const context = {
        imports: [],
      };
      // traverse
      path.traverse(createVisitor(context));
      if (context.imports.length > 0) {
        console.log(context.imports);
      }
    },
  };
  return { visitor };
}

function createVisitor(context) {
  return {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
      const moduleFullName = path.node.source.value;
      if (!moduleFullName.startsWith('zova-module-')) return;
      const components: string[] = [];
      for (const specifier of path.node.specifiers) {
        if (
          !t.isImportSpecifier(specifier) ||
          specifier.importKind !== 'value' ||
          !t.isIdentifier(specifier.imported) ||
          !isZComponent(specifier.imported.name)
        ) {
          continue;
        }
        components.push(specifier.imported.name);
      }
      if (components.length > 0) {
        const _import = {
          moduleFullName,
          moduleInfo: parseInfo(moduleFullName),
          components,
          path,
        };
        context.imports.push(_import);
      }
    },
    JSXOpeningElement(_path: NodePath<t.JSXOpeningElement>) {
      //console.log('Visiting jsx: ' + path.node.name);
    },
  };
}

function isZComponent(name: string) {
  return name[0] === 'Z' && isUpperCase(name[1]);
}

function isUpperCase(character) {
  return /^[A-Z]$/.test(character);
}

// function findImports(path: NodePath<t.Program>) {
//   //const _imports = [];
//   for (const node of path.node.body) {
//     if (!t.isImportDeclaration(node) || !node.source.value.startsWith('zova-module-')) continue;
//     //const _import = {};
//     for (const specifier of node.specifiers) {
//       if (!t.isImportSpecifier(specifier) || specifier.importKind !== 'value' || !t.isIdentifier(specifier.imported)) {
//         continue;
//       }
//       const specifierName = specifier.imported.name;
//       console.log(specifierName);
//     }
//   }
// }
