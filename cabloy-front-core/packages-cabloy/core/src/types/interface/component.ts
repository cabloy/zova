import 'vue/jsx-runtime';

declare module 'vue' {
  export interface ComponentCustomOptions {
    meta?: {
      global?: boolean;
    };
  }

  export interface AllowedComponentProps {
    onControllerRef?(controller: any): void; // not use unknown
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicAttributes {}
  }
}
