# 同步数据

Zova 借用 TanStack Query 的数据管理机制，实现了对同步数据的管理，从而方面我们在 cookie 和 localstorage 中同步写入和读取数据

下面，我们演示如何在 Model 中管理用户的数据

- 完整代码示例，请参见：
  - [home-user](https://github.com/cabloy/zova/blob/main/zova-dev/src/suite/a-home/modules/home-user/src/bean/model.user.ts)
  - [a-style](https://github.com/cabloy/zova/blob/main/zova-dev/src/suite-vendor/a-core/modules/a-style/src/bean/bean.theme.ts)

## 创建Model Bean

首先在 a-demo 模块中创建一个 Model Bean `user`

```bash
$ zova :create:model user --module=a-demo
```

`src/bean/model.user.ts`

```typescript
import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

@Model()
export class ModelUser extends BeanModelBase<ScopeModule> {}
```

- 使用@Model 装饰器
- 继承自基类 BeanModelBase

## localstorage

下面演示把用户信息存入 localstorage，当页面刷新时也会保持数据

### 如何定义

```typescript
export class ModelUser extends BeanModelBase<ScopeModule> {
  user?: ServiceUserEntity;

  protected async __init__() {
    this.user = this.$useQueryLocal({
      queryKey: ['user'],
    });
  }
```

- 与`异步数据`定义不同，同步数据直接在初始化方法`__init__`中定义
- 调用$useQueryLocal 创建 Query 对象
- 传入 queryKey，确保本地缓存的唯一性

### 如何使用

直接像常规变量一样读取和设置数据

```typescript
const user = this.user;
this.user = newUser;
```

## cookie

下面演示把用户 Token 存入 cookie，当页面刷新时也会保持数据

### 如何定义

```typescript
export class ModelUser extends BeanModelBase<ScopeModule> {
  token?: string;

  protected async __init__() {
    this.token = this.$useQueryCookie({
      queryKey: ['token'],
    });
  }
```

- 与`异步数据`定义不同，同步数据直接在初始化方法`__init__`中定义
- 调用$useQueryCookie 创建 Query 对象
- 传入 queryKey，确保本地缓存的唯一性

### 如何使用

直接像常规变量一样读取和设置数据

```typescript
const token = this.token;
this.token = newToken;
```
