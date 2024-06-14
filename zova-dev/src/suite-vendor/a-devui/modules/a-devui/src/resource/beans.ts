export * from '../bean/tool.themeHandler.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-devui.tool.themeHandler': ToolThemeHandler;
  }
}
