import { ViteNodeServer } from 'vite-node/server';
import { ViteNodeRunner } from 'vite-node/client';
import { installSourcemapsSupport } from 'vite-node/source-map';
import { ViteDevServer } from 'vite';

export class ViteNode {
  server: ViteDevServer;
  serverEntryFile: string;
  node: ViteNodeServer;
  runner: ViteNodeRunner;
  renderApp: any;
  static invalidates: Set<string> = new Set<string>();
  constructor(server: ViteDevServer, serverEntryFile: string) {
    this.server = server;
    this.serverEntryFile = serverEntryFile;
  }
  async attachServer() {
    // this is need to initialize the plugins
    await this.server.pluginContainer.buildStart({});
    // create vite-node server
    this.node = new ViteNodeServer(this.server);
    // fixes stacktraces in Errors
    installSourcemapsSupport({
      getSourceMap: source => this.node.getSourceMap(source),
    });
    return this.node;
  }
  createRunner() {
    // create vite-node runner
    this.runner = new ViteNodeRunner({
      root: this.server.config.root,
      base: this.server.config.base,
      // when having the server and runner in a different context,
      // you will need to handle the communication between them
      // and pass to this function
      fetchModule: id => {
        return this.node.fetchModule(id);
      },
      resolveId: (id, importer) => {
        return this.node.resolveId(id, importer);
      },
    });
    return this.runner;
  }
  async loadRender() {
    // invalidates
    const updates = this.runner.moduleCache.invalidateDepTree(ViteNode.invalidates);
    ViteNode.invalidates.clear();
    // load
    const start = performance.now();
    this.renderApp =
      updates.has(this.serverEntryFile) || !this.renderApp
        ? await this.runner.executeFile(this.serverEntryFile)
        : this.renderApp;
    if (updates.size) {
      const time = Math.round((performance.now() - start) * 1000) / 1000;
      console.info(`Vite server hmr ${updates.size} files`, time ? `in ${time}ms` : '');
    }
    return this.renderApp;
  }
}
