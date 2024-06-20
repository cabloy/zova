export interface ServiceTodoResult {
  id: string;
  title: string;
  done: boolean;
}

export interface ServiceTodoGetParams {
  id: string;
}

export type ServiceTodoDeleteParams = ServiceTodoGetParams;
export type ServiceTodoIntertParams = ServiceTodoResult;
export type ServiceTodoUpdateParams = ServiceTodoResult;
