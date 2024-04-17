declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicAttributes {
      onMotherRef?(mother: any): void;
      // see also: @vue/runtime-dom: HTMLAttributes
      class?: any;
    }
  }
}
