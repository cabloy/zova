import { Data } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanDataBase } from 'zova-module-a-data';
import { ServiceTodoIntertParams } from '../api/index.js';

@Data()
export class DataTodo extends BeanDataBase<ScopeModule> {
  select() {
    return this.$useQuery({
      queryKey: ['select'],
      queryFn: async () => {
        return this.scope.service.todo.select();
      },
      meta: {
        persister: { storage: 'db' },
      },
    });
  }

  insert() {
    return this.$useMutation<void, ServiceTodoIntertParams>({
      mutationFn: async params => {
        return this.scope.service.todo.insert(params);
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
      },
    });
  }
}
