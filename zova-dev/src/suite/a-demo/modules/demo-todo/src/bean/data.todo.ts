import { Data } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanDataBase } from 'zova-module-a-data';
import { experimental_createPersister } from '@tanstack/query-persist-client-core';

@Data()
export class DataTodo extends BeanDataBase<ScopeModule> {
  protected async __init__() {}

  select() {
    const persister = experimental_createPersister({
      storage: localStorage,
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
      prefix: `${this.app.config.env.appName}-query`,
      serialize: data => {
        return JSON.stringify(data);
      },
    });
    return this.$useQuery({
      queryKey: ['select'],
      queryFn: async () => {
        await this.app.meta.util.sleep(1000);
        return 100;
      },
      persister,
    });
  }
}
