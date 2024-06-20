import { ZovaApplication } from 'zova';
import {
  ServiceTodoDeleteParams,
  ServiceTodoGetParams,
  ServiceTodoIntertParams,
  ServiceTodoResult,
  ServiceTodoUpdateParams,
} from '../interface/todo.js';

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.post<any, ServiceTodoResult[]>('/demo/todo/select'),
    get: (params: ServiceTodoGetParams) => app.meta.$api.post<any, ServiceTodoResult>('/demo/todo/get', params),
    insert: (params: ServiceTodoIntertParams) => app.meta.$api.post('/demo/todo/insert', params),
    update: (params: ServiceTodoUpdateParams) => app.meta.$api.post('/demo/todo/update', params),
    delete: (params: ServiceTodoDeleteParams) => app.meta.$api.post('/demo/todo/delete', params),
  };
};
