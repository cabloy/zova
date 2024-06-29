# Async Data

The core of TanStack Query is to manage server-side data. Below, we demonstrate how to implement CRUD functionality in Model

- For complete code examples, please see: [demo-todo](https://github.com/cabloy/zova/blob/main/zova-dev/src/suite/a-demo/modules/demo-todo/src/bean/model.todo.ts)

## Data Query: select

### How to define

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

- Call `$useQueryExisting` to create a Query object
- Pass in `queryKey` to ensure the uniqueness of the local cache
- Pass in `queryFn` and call this function at the appropriate time to obtain server data
  - service.todo.select: see [Api service](../../essentials/scope/service.md)

### How to use

```typescript
export class RenderTodo {
  @Use()
  $$modelTodo: ModelTodo;

  render() {
    return (
      <div>
        <div>isLoading: {this.$$modelTodo.select().isLoading}</div>
        <div>
          {this.$$modelTodo.select().data?.map(item => {
            return <div>{item.title}</div>;
          })}
        </div>
      </div>
    );
  }
}
```

- Inject Model Bean instance: `$$modelTodo`
- Invoke `$$modelTodo.select()` to obtain the Query object
  - Repeated calls to this method return the same Query object
- Directly use the state and data of the Query object

## Data Query: get

### How to define

```typescript
export class ModelTodo {
  get(params?: ServiceTodoGetParams) {
    if (!params) return undefined;
    return this.$useQueryExisting({
      queryKey: ['get', params.id],
      queryFn: async () => {
        return this.scope.service.todo.get(params);
      },
    });
  }
}
```

- Invoke `$useQueryExisting` to create a Query object
- Pass in `queryKey` to ensure the uniqueness of the local cache
  - Since it is a single piece of data, the key field value of the entry needs to be specified
- Pass in `queryFn` and call this function at the appropriate time to obtain server data

### How to use

```typescript
export class RenderTodo {
  render() {
    const params = { id: '1' };
    const todo = this.$$modelTodo.get(params);
    return (
      <div>
        <div>todo title: {todo?.data?.title}</div>
        <div>{todo?.error?.message}</div>
      </div>
    );
  }
}
```

- Invoke `$$modelTodo.get()` to get the Query object
  - Repeated calls to this method return the same Query object
- Directly use the state and data of the Query object

## Data Mutation: insert

### How to define

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

- Invoke `$useMutationExisting` to create a Mutation object
- Pass in `mutationKey` to ensure the uniqueness of the local cache
- Pass in `mutationFn` to perform the mutation operation
- Listen to the `onSuccess` method, when the data is created successfully, set the `select` query to invalid to re-fetch the data

### How to use

```typescript
async addTodo() {
  const todo = {
    id: this.app.meta.util.uuid(),
    title: this.newTitle,
    done: false,
  };
  await this.$$modelTodo.insert().mutateAsync(todo);
}
```

- Prepare new data todo
- Invoke `$$modelTodo.insert()` to obtain the Mutation object
  - Repeated calls to this method return the same Mutation object
- Directly use the `mutateAsync` method of the Mutation object to complete asynchronous operations

## Data Mutation: update

### How to define

```typescript
export class ModelTodo {
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
}
```

- Invoke `$useMutationExisting` to create a Mutation object
- Pass in `mutationKey` to ensure the uniqueness of the local cache
- Pass in `mutationFn` to perform the mutation operation
- Listen to the `onSuccess` method, when the data is created successfully, set the `select` and `get` queries to invalid to re-fetch the data

### How to use

```typescript
async completeTodo(item: ServiceTodoEntity) {
  const todo = { ...item, done: true };
  await this.$$modelTodo.update().mutateAsync(todo);
}
```

- Prepare data todo
- Invoke `$$modelTodo.update()` to obtain the Mutation object
  - Repeated calls to this method return the same Mutation object
- Directly use the `mutateAsync` method of the Mutation object to complete asynchronous operations

## Data Mutation: delete

### How to define

```typescript
export class ModelTodo {
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
```

- Invoke `$useMutationExisting` to create a Mutation object
- Pass in `mutationKey` to ensure the uniqueness of the local cache
- Pass in `mutationFn` to perform the mutation operation
- Listen to the `onSuccess` method, when the data is created successfully, set the `select` and `get` queries to invalid in order to re-fetch the data

### How to use

```typescript
async deleteTodo(item: ServiceTodoEntity) {
  await this.$$modelTodo.delete().mutateAsync({ id: item.id });
}
```

- Invoke `$$modelTodo.delete()` to obtain the Mutation object
  - Repeated calls to this method return the same Mutation object
- Directly use the `mutateAsync` method of the Mutation object to complete asynchronous operations
