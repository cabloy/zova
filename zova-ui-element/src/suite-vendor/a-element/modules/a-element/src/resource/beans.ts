export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-element.tool.themeHandler': ToolThemeHandler;
    'a-element.model.theme': ModelTheme;
  }
}
