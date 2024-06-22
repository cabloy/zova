import { ZovaApplication } from 'zova';
import {
  ServiceTodoDeleteParams,
  ServiceTodoGetParams,
  ServiceTodoIntertParams,
  ServiceTodoEntity,
  ServiceTodoUpdateParams,
} from '../interface/todo.js';

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceTodoEntity[]>('/demo/todo/select'),
    get: (params: ServiceTodoGetParams) => app.meta.$api.get<any, ServiceTodoEntity>('/demo/todo/get', { params }),
    insert: (params: ServiceTodoIntertParams) => app.meta.$api.post('/demo/todo/insert', params),
    update: (params: ServiceTodoUpdateParams) => app.meta.$api.post('/demo/todo/update', params),
    delete: (params: ServiceTodoDeleteParams) => app.meta.$api.post('/demo/todo/delete', params),
  };
};
