# API

## $useQueryExisting

创建 Query 对象，如果已经存在则直接返回

```typescript
export class ModelTodo {
  select() {
    return this.$useQueryExisting({
      queryKey: ['select'],
      queryFn: async () => {
        return this.scope.service.todo.select();
      },
    });
  }
}
```

### Options

- queryKey
  - Required
  - 确保本地缓存的唯一性
  - 自动添加命名空间。比如，ModelTodo 的 Bean 标识是`a-demo.model.todo`，那么完整的 queryKey 就是`['a-demo.model.todo', 'select']`
- queryFn
  - Required
  - 在合适的时机调用此函数获取服务端数据
- meta
  - Optional
  - 扩展参数

### Returns

- 参见: [tanstack: useQuery](https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery)

## $useMutationExisting

创建 Mutation 对象，如果已经存在则直接返回

```typescript
export class ModelTodo {
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
}
```

### Options

- mutationKey
  - Required
  - 确保本地缓存的唯一性
  - 自动添加命名空间。比如，ModelTodo 的 Bean 标识是`a-demo.model.todo`，那么完整的 queryKey 就是`['a-demo.model.todo', 'insert']`
- mutationFn
  - Required
  - 用于执行变更操作
- onSuccess
  - Optional
  - 变更操作成功时调用
- onError
  - Optional
  - 变更操作失败时调用
- onSettled
  - Optional
  - 变更操作成功或失败均调用

### Returns

- 参见: [tanstack: useMutation](https://tanstack.com/query/latest/docs/framework/vue/reference/useMutation)

## $invalidateQueries

将 Query 对象设为失效， 以便重新获取数据

```typescript
this.$invalidateQueries({ queryKey: ['select'] });
this.$invalidateQueries({ queryKey: ['get', params.id] });
```

### Query Filters

- 参见: [tanstack: Query Filters](https://tanstack.com/query/latest/docs/framework/vue/guides/filters#query-filters)

## $useQueryLocal

创建基于 localstorage 的 Query 对象

```typescript
export class ModelUser extends BeanModelBase<ScopeModule> {
  user?: ServiceUserEntity;

  protected async __init__() {
    this.user = this.$useQueryLocal({
      queryKey: ['user'],
    });
  }
}
```

### Options

- queryKey
  - Required
- meta
  - Optional
  - 扩展参数

## $useQueryCookie

创建基于 cookie 的 Query 对象

```typescript
export class ModelUser extends BeanModelBase<ScopeModule> {
  token?: string;

  protected async __init__() {
    this.token = this.$useQueryCookie({
      queryKey: ['token'],
    });
  }
}
```

### Options

- queryKey
  - Required
- meta
  - Optional
  - 扩展参数
