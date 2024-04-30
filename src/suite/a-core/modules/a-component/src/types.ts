import { Component } from 'vue';
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
      onMotherRef?(mother: any): void;
      // see also: @vue/runtime-dom: HTMLAttributes
      class?: any;
      onClick?: (evt: Event) => void;
    }
  }
}

declare module '@cabloy/front-core' {
  export interface IModuleResource {
    components: Record<string, Component>;
  }
}
