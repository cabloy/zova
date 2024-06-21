import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { VueQueryPlugin, VueQueryPluginOptions, defaultShouldDehydrateQuery } from '@tanstack/vue-query';

@Local()
export class Storage extends BeanBase<ScopeModule> {
  protected async __init__() {
    const vueQueryPluginOptions: VueQueryPluginOptions = {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            // gcTime: 1000 * 60 * 5,
          },
          dehydrate: {
            shouldDehydrateQuery(query) {
              if (query.meta?.ssr?.dehydrate === false) return false;
              return defaultShouldDehydrateQuery(query);
            },
          },
        },
      },
    };
    this.app.vue.use(VueQueryPlugin, vueQueryPluginOptions);
  }

  protected __dispose__() {}
}
