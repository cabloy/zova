import { Model } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanModelBase, DataMutation } from 'zova-module-a-model';
import {
  ServiceTodoDeleteParams,
  ServiceTodoGetParams,
  ServiceTodoIntertParams,
  ServiceTodoUpdateParams,
} from '../api/index.js';

@Model()
export class ModelTodo extends BeanModelBase<ScopeModule> {
  insert: DataMutation<void, ServiceTodoIntertParams>;
  update: DataMutation<void, ServiceTodoUpdateParams>;
  delete: DataMutation<void, ServiceTodoDeleteParams>;

  protected async __init__() {
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

  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        return this.scope.service.todo.select();
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
