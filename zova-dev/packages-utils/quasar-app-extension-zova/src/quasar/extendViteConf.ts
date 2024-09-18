import { generateConfigDefine, ZovaViteConfigResult } from 'zova-vite';
import { mergeConfig, UserConfig as ViteUserConfig, createLogger } from 'vite';
import { ConfigContext } from './types.js';
import { viteNodePlugin } from './viteNodePlugin.js';

const __SvgIconPattern = /\.metadata\/icons\/groups\/.*?\.svg/;

export function extendViteConf(context: ConfigContext) {
  return function extendViteConf(conf: ViteUserConfig, opts) {
    const zovaViteMeta = context.zovaViteMeta as ZovaViteConfigResult;
    // conf.build override zovaViteMeta.viteConfig.build
    const minify = conf.build?.minify;
    // have two outDir for ssr
    const outDir = conf.build?.outDir;
    conf.build = mergeConfig(conf.build as unknown as any, zovaViteMeta.viteConfig.build);
    if (minify === false) {
      conf.build.minify = minify;
    }
    if (outDir) {
      conf.build.outDir = outDir;
    }
    // hmr
    if (opts.isClient) {
      conf.server = mergeConfig(conf.server || {}, {
        hmr: {
          port: 24679,
        },
      });
    }
    // assetsInlineLimit
    if (opts.isServer) {
      conf.build.assetsInlineLimit = (filePath: string) => {
        if (__SvgIconPattern.test(filePath)) {
          return Infinity as any;
        }
      };
    }
    // env
    let env;
    if (opts.isClient) {
      env = zovaViteMeta.env;
    } else {
      env = Object.assign({}, zovaViteMeta.env, {
        SERVER: true,
        CLIENT: false,
      });
      // special for dist files
      process.env.SERVER = env.SERVER;
      // process.env.CLIENT = env.CLIENT; // should not set if false
    }
    // define
    if (opts.isClient) {
      const define = generateConfigDefine(env);
      conf.define = mergeConfig(conf.define || {}, define);
    } else {
      // env: special for dist files
      const define = generateConfigDefine({
        SERVER: env.SERVER,
        CLIENT: env.CLIENT,
        DEV: env.DEV,
        PROD: env.PROD,
        SSR: env.SSR,
      });
      conf.define = mergeConfig(conf.define || {}, define);
    }
    // ssr
    if (opts.isServer && (context.configMeta?.mode === 'production' || process.env.SSR_VITE_NODE === 'true')) {
      conf.ssr = mergeConfig(conf.ssr || {}, {
        noExternal: true,
        external: [
          'vue',
          'pinia',
          '@vue/runtime-core',
          '@vue/reactivity',
          '@cabloy/vue-reactivity',
          '@cabloy/vue-runtime-core',
        ],
      });
    }
    // ssr: vite-node
    if (opts.isServer && context.configMeta?.mode === 'development' && process.env.SSR_VITE_NODE === 'true') {
      // invalidates
      conf.plugins!.push(viteNodePlugin());
      // optimizeDeps
      conf.optimizeDeps = mergeConfig(conf.optimizeDeps || {}, {
        noDiscovery: true,
      });
      // logger
      const logger = createLogger();
      const loggerWarn = logger.warn;
      logger.warn = (msg, options) => {
        if (msg.includes('Failed to load source map')) return;
        loggerWarn(msg, options);
      };
      conf.customLogger = logger;
    }
  };
}
