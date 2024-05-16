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
  server: any;
  vitePlugins: any[];
  viteConfig: any;
}

export type CabloyVitePlugin = [
  string,
  (...args: any[]) => any,
  any,
  { client?: boolean; server?: boolean } | undefined,
];
