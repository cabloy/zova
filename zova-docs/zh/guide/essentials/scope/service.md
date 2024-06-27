# Api服务

模块可以集中管理后端 Api 调用，把 Api 调用包装为`服务`资源，从而方便在任何模块访问

## 定义Api服务

以模块`home-layout`为例，通过调用 Api`/home/layout/menu/select`获取菜单。那么，可以按如下方式定义 Api 服务：

`src/suite/a-home/modules/home-layout/src/api/service/menu.ts`

```typescript
import { ZovaApplication } from 'zova';
import { ServiceMenuEntity } from '../interface/menu.js';

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select'),
  };
};
```

- 关于`$api`的用法，参见：[API](../../techniques/api/introduction.md)

`src/suite/a-home/modules/home-layout/src/api/service/index.ts`

```typescript
import menu from './menu.js';

export const services = {
  menu,
};
```

## 使用Api服务

可以通过 Scope 实例直接访问 Api 服务

`src/suite/a-home/modules/home-layout/src/bean/data.menu.ts`

```typescript
const data = await this.scope.service.menu.select();
```

## 跨模块使用Api服务

```typescript
import type { ScopeModuleHomeLayout } from 'zova-module-home-layout';

export class TestA {
  @UseScope('home-layout')
  scopeModuleHomeLayout: ScopeModuleHomeLayout;

  protected async __init__() {
    const data = await this.scopeModuleHomeLayout.service.menu.select();
  }
}
```

## 举例：CRUD

下面以 Todo 的 CRUD 为例：

### 定义Api服务

`src/suite/a-demo/modules/demo-todo/src/api/service/todo.ts`

```typescript
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
```

`src/suite/a-demo/modules/demo-todo/src/api/service/index.ts`

```typescript
import todo from './todo.js';

export const services = {
  todo,
};
```

### 使用Api服务

`src/suite/a-demo/modules/demo-todo/src/bean/data.todo.ts`

```typescript
await this.scope.service.todo.select();
await this.scope.service.todo.get(params);
await this.scope.service.todo.insert(params);
await this.scope.service.todo.update(params);
await this.scope.service.todo.delete(params);
```
