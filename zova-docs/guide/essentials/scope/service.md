# Api Service

Modules can centrally manage backend Api calls and package Api calls as `service` resources, making them easy to access in any module

## Define Api services

Take the module `home-layout` as an example, and get the menu by calling the Api `/home/layout/menu/select`. Then, you can define the Api service as follows:

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

- For the usage of `$api`, see: [API](../../techniques/api/introduction.md)

`src/suite/a-home/modules/home-layout/src/api/service/index.ts`

```typescript
import menu from './menu.js';

export const services = {
  menu,
};
```

## Use API services

You can directly access API services through Scope instance

`src/suite/a-home/modules/home-layout/src/bean/data.menu.ts`

```typescript
const data = await this.scope.service.menu.select();
```

## Use API services cross-module

```typescript
import { ScopeModuleHomeLayout } from 'zova-module-home-layout';

export class TestA {
  @UseScope()
  $$scopeModuleHomeLayout: ScopeModuleHomeLayout;

  protected async __init__() {
    const data = await this.$$scopeModuleHomeLayout.service.menu.select();
  }
}
```

## Example: CRUD

Let's take Todo's CRUD as an example:

### Define Api services

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

### Use Api services

`src/suite/a-demo/modules/demo-todo/src/bean/data.todo.ts`

```typescript
await this.scope.service.todo.select();
await this.scope.service.todo.get(params);
await this.scope.service.todo.insert(params);
await this.scope.service.todo.update(params);
await this.scope.service.todo.delete(params);
```
