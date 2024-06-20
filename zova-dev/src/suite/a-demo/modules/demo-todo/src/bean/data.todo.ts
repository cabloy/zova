import { BeanBase, Data } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { useQuery } from '@tanstack/vue-query';

@Data()
export class DataTodo extends BeanBase<ScopeModule> {
  protected async __init__() {}

  select() {
    return this.bean.runWithInstanceScopeOrAppContext(() => {
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
