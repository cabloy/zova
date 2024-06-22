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
