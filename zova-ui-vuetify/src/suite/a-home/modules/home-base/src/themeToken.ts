export interface ThemeToken {
  dark: boolean;
  colors: {
    background: string;
    surface: string;
    'surface-bright': string;
    'surface-light': string;
    'surface-variant': string;
    'on-surface-variant': string;
    primary: string;
    'primary-darken-1': string;
    secondary: string;
    'secondary-darken-1': string;
    error: string;
    info: string;
    success: string;
    warning: string;
  };
  variables: {
    'border-color': string;
    'border-opacity': number;
    'high-emphasis-opacity': number;
    'medium-emphasis-opacity': number;
    'disabled-opacity': number;
    'idle-opacity': number;
    'hover-opacity': number;
    'focus-opacity': number;
    'selected-opacity': number;
    'activated-opacity': number;
    'pressed-opacity': number;
    'dragged-opacity': number;
    'theme-kbd': string;
    'theme-on-kbd': string;
    'theme-code': string;
    'theme-on-code': string;
  };
}
