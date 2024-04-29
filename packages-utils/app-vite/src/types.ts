export interface CabloyViteConfigChunkVendor {
  match: (string | RegExp)[];
  output: string;
}

export interface CabloyViteConfigOptions {
  appDir: string;
  runtimeDir: string;
  cabloyManualChunk: {
    debug: boolean;
    vendors: CabloyViteConfigChunkVendor[];
  };
}

export interface CabloyViteConfigResult {
  env: { [name: string]: string };
  alias: { [name: string]: string };
  proxy: object;
  vitePlugins: any[];
  viteConfig: object;
}

export type CabloyVitePlugin = [
  string,
  (...args: any[]) => any,
  object,
  { client?: boolean; server?: boolean } | undefined,
];
