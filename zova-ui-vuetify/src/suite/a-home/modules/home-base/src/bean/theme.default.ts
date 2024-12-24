import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, IThemeApplyResult, IThemeBase } from 'zova-module-a-style';
import { ThemeToken } from '../themeToken.js';

const themeLight = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
};

const themeDark = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    'surface-bright': '#ccbfd6',
    'surface-light': '#424242',
    'surface-variant': '#a3a3a3',
    'on-surface-variant': '#424242',
    primary: '#2196F3',
    'primary-darken-1': '#277CC1',
    secondary: '#54B6B2',
    'secondary-darken-1': '#48A9A6',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.5,
    'idle-opacity': 0.1,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#343434',
    'theme-on-code': '#CCCCCC',
  },
};

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements IThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<IThemeApplyResult> {
    // token
    const token: ThemeToken = dark ? themeDark : themeLight;
    return { token };
  }
}
