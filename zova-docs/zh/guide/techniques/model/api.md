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

### Returns

- 参见: [tanstack: useQuery](https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery)
