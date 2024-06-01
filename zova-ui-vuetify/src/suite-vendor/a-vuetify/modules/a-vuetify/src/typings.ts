import 'vue/jsx-runtime';
declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      onClick?: (e: MouseEvent) => void;
    }
  }
}
