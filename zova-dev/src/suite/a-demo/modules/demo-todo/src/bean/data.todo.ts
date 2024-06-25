import { Data } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanDataBase, DataMutation, DataQuery } from 'zova-module-a-data';
import { ServiceTodoEntity, ServiceTodoGetParams, ServiceTodoIntertParams } from '../api/index.js';

@Data()
export class DataTodo extends BeanDataBase<ScopeModule> {
  select: DataQuery<ServiceTodoEntity[]>;
  insert: DataMutation<void, ServiceTodoIntertParams>;

  protected async __init__() {
    this.select = this.$useQuery({
      queryKey: ['select'],
      queryFn: async () => {
        return this.scope.service.todo.select();
      },
    });

    this.insert = this.$useMutation<void, ServiceTodoIntertParams>({
      mutationFn: async params => {
        return this.scope.service.todo.insert(params);
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
      },
    });
  }

  get(params?: ServiceTodoGetParams) {
    if (!params) return undefined;
    return this.$useQueryExisting({
      queryKey: ['get', params.id],
      queryFn: async () => {
        return this.scope.service.todo.get(params);
      },
    });
  }
}
