import 'vue/jsx-runtime';

declare module 'vue' {
  export interface ComponentCustomOptions {
    meta?: {
      global?: boolean;
    };
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicAttributes {
      onControllerRef?(controller: any): void;
      // see also: @vue/runtime-dom: HTMLAttributes
      class?: any;
      onClick?: (evt: Event) => void;
    }
  }
}
