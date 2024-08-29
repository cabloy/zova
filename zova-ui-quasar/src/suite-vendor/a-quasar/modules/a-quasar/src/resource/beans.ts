export * from '../bean/model.theme.js';
export * from '../bean/tool.themeHandler.js';
import { ToolThemeHandler } from '../bean/tool.themeHandler.js';
import { ModelTheme } from '../bean/model.theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-quasar.tool.themeHandler': ToolThemeHandler;
    'a-quasar.model.theme': ModelTheme;
  }
}
