import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { dehydrate, hydrate, QueryClient, VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

@Local()
export class LocalStorage extends BeanBase<ScopeModule> {
  protected async __init__() {
    // options
    let options = this.scope.config.queryClientConfig.defaultOptions;
    if (process.env.SERVER) {
      options = this.app.meta.util.extend({}, options, {
        queries: { gcTime: Infinity },
      });
    }
    // queryClient
    const queryClient = new QueryClient({
      defaultOptions: options,
    });
    // use plugin
    const vueQueryPluginOptions: VueQueryPluginOptions = { queryClient };
    this.app.vue.use(VueQueryPlugin, vueQueryPluginOptions);
    // onRendered
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.state.query = dehydrate(queryClient, {
          shouldDehydrateMutation: () => {
            return false;
          },
        });
        queryClient.clear();
      });
    }
    // client
    if (process.env.CLIENT && this.ctx.meta.ssr.isRuntimeSsrPreHydration) {
      hydrate(queryClient, this.ctx.meta.ssr.state.query);
    }
  }
}
