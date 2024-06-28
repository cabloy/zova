import { Model } from 'zova';
import { ScopeModule } from '../resource/this.js';
import { BeanModelBase } from 'zova-module-a-model';
import {
  ServiceTodoDeleteParams,
  ServiceTodoGetParams,
  ServiceTodoIntertParams,
  ServiceTodoUpdateParams,
} from '../api/index.js';

@Model()
export class ModelTodo extends BeanModelBase<ScopeModule> {
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

  insert() {
    return this.$useMutationExisting<void, ServiceTodoIntertParams>({
      mutationKey: ['insert'],
      mutationFn: async params => {
        return this.scope.service.todo.insert(params);
      },
      onSuccess: () => {
        this.$invalidateQueries({ queryKey: ['select'] });
      },
    });
  }

  update() {
    return this.$useMutationExisting<void, ServiceTodoUpdateParams>({
      mutationKey: ['update'],
      mutationFn: async params => {
        return this.scope.service.todo.update(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
      },
    });
  }

  delete() {
    return this.$useMutationExisting<void, ServiceTodoDeleteParams>({
      mutationKey: ['delete'],
      mutationFn: async params => {
        return this.scope.service.todo.delete(params);
      },
      onSuccess: (_data, params) => {
        this.$invalidateQueries({ queryKey: ['select'] });
        this.$invalidateQueries({ queryKey: ['get', params.id] });
      },
    });
  }
}
