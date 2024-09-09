import { ZovaApplication } from 'zova';

export interface ServiceTodoEntity {
  id: string;
  title: string;
  done: boolean;
}

export interface ServiceTodoGetParams {
  id: string;
}

export type ServiceTodoDeleteParams = ServiceTodoGetParams;
export type ServiceTodoIntertParams = ServiceTodoEntity;
export type ServiceTodoUpdateParams = ServiceTodoEntity;

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceTodoEntity[]>('/demo/todo/select'),
    get: (params: ServiceTodoGetParams) => app.meta.$api.get<any, ServiceTodoEntity>('/demo/todo/get', { params }),
    insert: (params: ServiceTodoIntertParams) =>
      app.meta.$api.post<any, void, ServiceTodoIntertParams>('/demo/todo/insert', params),
    update: (params: ServiceTodoUpdateParams) =>
      app.meta.$api.post<any, void, ServiceTodoUpdateParams>('/demo/todo/update', params),
    delete: (params: ServiceTodoDeleteParams) =>
      app.meta.$api.post<any, void, ServiceTodoDeleteParams>('/demo/todo/delete', params),
  };
};
