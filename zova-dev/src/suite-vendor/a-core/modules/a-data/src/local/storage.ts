import { BeanBase, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

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
        },
      },
    };
    this.app.vue.use(VueQueryPlugin, vueQueryPluginOptions);
  }

  protected __dispose__() {}
}
