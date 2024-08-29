import { ComponentInternalInstance, VNode } from 'vue';

export interface SSRContext {
  _meta: SSRContextMeta;
  state: SSRContextState;
  req: Request;
  res: Response;
  /** The global "nonce" attribute to use */
  nonce?: string;
  /**
   * Registers a function to be executed server-side after
   * app has been rendered with Vue. You might need this
   * to access ssrContext again after it has been fully processed.
   * Example: ssrContext.onRendered(() => { ... })
   */
  onRendered: (fn: () => void) => void;
  rendered: () => void;
  __qMetaList: SSRMetaOptions[];
}

export interface SSRContextMeta {
  htmlAttrs: string;
  headTags: string;
  endingHeadTags: string;
  bodyClasses: string;
  bodyAttrs: string;
  bodyTags: string;
}

export interface SSRContextState {}

// from: quasar/dist/types/meta.d.ts
// Cannot use `Record<string, string>` as TS would error out about `template` signature
// See: https://basarat.gitbook.io/typescript/type-system/index-signatures#all-members-must-conform-to-the-string-index-signature
type SSRMetaTagOptions = Record<string, any> & {
  template?: (attributeValue: string) => string;
};

export interface SSRMetaOptions {
  title?: string;
  titleTemplate?(title: string): string;
  meta?: { [name: string]: SSRMetaTagOptions };
  link?: { [name: string]: Record<string, string> };
  script?: { [name: string]: Record<string, string> };
  htmlAttr?: { [name: string]: string | undefined };
  bodyAttr?: { [name: string]: string | undefined };
  bodyStyle?: { [name: string]: string | undefined };
  bodyClass?: { [name: string]: boolean };
  noscript?: { [name: string]: string };
}

export interface SSRMetaOptionsWrapper {
  active: boolean;
  val?: SSRMetaOptions;
}

export interface OnHydratePropHasMismatchResult {
  ignore?: boolean;
  clientValue?: any;
}

export type OnHydratePropHasMismatch = (
  el: Element,
  key: string,
  clientValue: any,
  vnode: VNode,
  instance: ComponentInternalInstance | null,
) => OnHydratePropHasMismatchResult;

export interface SSREnv {
  ssr: boolean;
  server: boolean;
  client: boolean;
}
