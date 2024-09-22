import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
import { IModuleInfo, parseInfo } from '@cabloy/module-info';

interface ComponentInfo {
  importName: string;
  localName: string;
}

interface ComponentFindInfo {
  import: ImportInfo;
  component: ComponentInfo;
}

interface ImportInfo {
  moduleFullName: string;
  moduleInfo: IModuleInfo;
  components: ComponentInfo[];
  path: NodePath<t.ImportDeclaration>;
}

interface ContextInfo {
  imports: ImportInfo[];
}

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(path: NodePath<t.Program>) {
      // context
      const context: ContextInfo = {
        imports: [],
      };
      // traverse
      path.traverse(createVisitor(context));
    },
  };
  return { visitor };
}

function createVisitor(context) {
  return {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
      const moduleFullName = path.node.source.value;
      if (!moduleFullName.startsWith('zova-module-')) return;
      const components: ComponentInfo[] = [];
      for (const specifier of path.node.specifiers) {
        if (
          !t.isImportSpecifier(specifier) ||
          specifier.importKind !== 'value' ||
          !t.isIdentifier(specifier.imported) ||
          !isZComponent(specifier.imported.name)
        ) {
          continue;
        }
        components.push({
          importName: specifier.imported.name,
          localName: specifier.local.name,
        });
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
    JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
      const identifier = path.node.name;
      if (!t.isJSXIdentifier(identifier)) return;
      const componentInfo = findComponent(identifier.name, context);
      if (!componentInfo) return;
      console.log(componentInfo);
    },
  };
}

function isZComponent(name: string) {
  return name[0] === 'Z' && isUpperCase(name[1]);
}

function isUpperCase(character) {
  return /^[A-Z]$/.test(character);
}

function findComponent(nodeName: string, context: ContextInfo): ComponentFindInfo | undefined {
  for (const _import of context.imports) {
    const component = _import.components.find(item => item.localName === nodeName);
    if (component) {
      return {
        import: _import,
        component,
      };
    }
  }
}
