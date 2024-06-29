# Sync Data

Zova uses the data management mechanism of TanStack Query to realize the management of synchronized data, so that we can write and read data synchronously in cookies and localstorage

Below, we demonstrate how to manage user data in Model

- For complete code examples, see:
  - [home-user](https://github.com/cabloy/zova/blob/main/zova-dev/src/suite/a-home/modules/home-user/src/bean/model.user.ts)
  - [a-style](https://github.com/cabloy/zova/blob/main/zova-dev/src/suite-vendor/a-core/modules/a-style/src/bean/bean.theme.ts)

## Create Model Bean

First create a Model Bean `user` in the a-demo module

```bash
$ zova :create:model user --module=a-demo
```

`src/bean/model.user.ts`

```typescript
import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';

@Model()
export class ModelUser extends BeanModelBase {}
```

- Use `@Model` decorator
- Inherited from base class `BeanModelBase`

## localstorage

The following demonstrates storing user information in localstorage, and the data will be retained when the page is refreshed

### How to define

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

- Unlike `async data` definition, `sync data` is defined directly in the initialization method `__init__`
- Invoke `$useQueryLocal` to create a Query object
- Pass in `queryKey` to ensure the uniqueness of the local cache

### How to use

Read and set data directly like regular variables

```typescript
const user = this.user;
this.user = newUser;
```

## cookie

The following demonstrates storing the user Token in a cookie, and the data will be retained when the page is refreshed.

### How to define

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

- Unlike `async data` definition, `sync data` is defined directly in the initialization method `__init__`
- Invoke `$useQueryCookie` to create a Query object
- Pass in `queryKey` to ensure the uniqueness of the local cache

### How to use

Read and set data directly like regular variables

```typescript
const token = this.token;
this.token = newToken;
```
