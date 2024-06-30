# API

## $useQueryExisting

Create a Query object and return it directly if it already exists

```typescript
@Model()
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
  - Ensure local cache uniqueness
  - Namespaces are added automatically. For example, the Bean identifier of ModelTodo is `a-demo.model.todo`, then the complete queryKey is `['a-demo.model.todo', 'select']`
- queryFn
  - Required
  - Invoke this function at the appropriate time to fetch server data
- meta
  - Optional
  - Extended parameters

### Returns

- See: [tanstack: useQuery](https://tanstack.com/query/latest/docs/framework/vue/reference/useQuery)

## $useMutationExisting

Create a Mutation object and return it directly if it already exists

```typescript
@Model()
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
  - Ensure local cache uniqueness
  - Namespaces are added automatically. For example, the Bean identifier of ModelTodo is `a-demo.model.todo`, then the complete mutationKey is `['a-demo.model.todo', 'insert']`
- mutationFn
  - Required
  - Used to perform mutation operation
- onSuccess
  - Optional
  - Will be invoked onSuccess
- onError
  - Optional
  - Will be invoked onError
- onSettled
  - Optional
  - Will be invoked onSuccess or onError

### Returns

- See: [tanstack: useMutation](https://tanstack.com/query/latest/docs/framework/vue/reference/useMutation)

## $invalidateQueries

Invalidate the Query object in order to re-fetch the data

```typescript
this.$invalidateQueries({ queryKey: ['select'] });
this.$invalidateQueries({ queryKey: ['get', params.id] });
```

### Query Filters

- See: [tanstack: Query Filters](https://tanstack.com/query/latest/docs/framework/vue/guides/filters#query-filters)

## $useQueryLocal

Create a Query object based on localstorage

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
  - Extended parameters

## $useQueryCookie

Create a Query object based on cookie

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
  - Extended parameters

## Query Meta

When creating a Query object, you can pass in the `meta` extension parameters

For example, we can store the current theme's `darkMode` in a cookie. The type of darkMode is `true | false | 'auto'`, but when storing cookies, the types are all strings, so conversion operation is required the next time the value is retrieved from the cookie

```typescript
darkMode: ThemeDarkMode; // auto/true/false

protected async __init__() {
  this.darkMode = this.$useQueryCookie({
    queryKey: ['themedarkmode'],
    meta: {
      persister: {
        deserialize: value => {
          value = value === 'true' ? true : value === 'false' ? false : !value ? undefined : value;
          return this.$deserializeCookie(value);
        },
      },
      defaultData: 'auto',
    },
  });
}
```

- meta.persister
  - serialize：Custom serialization method
  - deserialize：Custom deserialization method
- meta.defaultData
  - Provides default values, which are only valid for `sync data`
