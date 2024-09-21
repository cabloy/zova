import { /*template,*/ types as t, type PluginPass } from '@babel/core';
import type { NodePath, Visitor } from '@babel/traverse';
//import { parseInfoFromPath } from '@cabloy/module-info';

export default function () {
  const visitor: Visitor<PluginPass> = {
    Program(_path: NodePath<t.Program>, state) {
      const sourceFileName = state.file.opts.sourceFileName || state.file.opts.filename;
      console.log(sourceFileName);
    },
  };
  return { visitor };
}
