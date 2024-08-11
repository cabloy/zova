import 'vue';
import 'vue/jsx-runtime';
import '@vue/runtime-dom';

declare module 'vue' {
  export interface ComponentCustomOptions {
    meta?: {
      global?: boolean;
    };
  }

  export interface AllowedComponentProps {}
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      class?: unknown;
      style?: unknown;
      onClick?: (e: MouseEvent) => void;
    }
  }
}

declare module '@vue/runtime-dom' {
  export interface LabelHTMLAttributes {
    htmlFor?: string;
  }

  export interface SVGAttributes {
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeWidth?: string;
  }
}
