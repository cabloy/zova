import { BeanBase, Store } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { useQuery } from '@tanstack/vue-query';

@Store()
export class StoreTodo extends BeanBase<ScopeModule> {
  protected async __init__() {}

  select() {
    this.bean.runWithInstanceScopeOrAppContext(() => {
      const data = useQuery({
        queryKey: ['demo-todo.store.todo', 'select'],
        queryFn: async () => {
          await this.app.meta.util.sleep(1000);
          return 100;
        },
      });
      return data;
    });
  }
}
