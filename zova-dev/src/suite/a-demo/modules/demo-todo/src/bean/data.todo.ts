import { Data } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanDataBase, DataMutation, DataQuery } from 'zova-module-a-data';
import {
  ServiceTodoDeleteParams,
  ServiceTodoEntity,
  ServiceTodoGetParams,
  ServiceTodoIntertParams,
  ServiceTodoUpdateParams,
} from '../api/index.js';

@Data()
export class DataTodo extends BeanDataBase<ScopeModule> {
  select: DataQuery<ServiceTodoEntity[]>;
  insert: DataMutation<void, ServiceTodoIntertParams>;
  update: DataMutation<void, ServiceTodoUpdateParams>;
  delete: DataMutation<void, ServiceTodoDeleteParams>;

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

    this.update = this.$useMutation<void, ServiceTodoUpdateParams>({
      mutationFn: async params => {
        return this.scope.service.todo.update(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
      },
    });

    this.delete = this.$useMutation<void, ServiceTodoDeleteParams>({
      mutationFn: async params => {
        return this.scope.service.todo.delete(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
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
