# Store Bean

通过 store bean 我们可以定义一个全局的状态对象，然后在任何一个业务模块中使用。因此，不再需要使用 pinia

## 创建Store Bean: userInfo

我们先来创建一个 store bean `userInfo`。可以通过 cli 命令创建 store bean 的代码骨架：

```bash
$ cabloy front:create:store userInfo
```

生成的文件：`store.userInfo.ts`，内容如下：

```typescript
import { BeanBase, Store } from '@cabloy/front';

@Store()
export class StoreUserInfo extends BeanBase {
  protected async __init__() {}

  protected __dispose__() {}
}
```

- `Store` 是装饰器函数。通过 Store 装饰的 class 会自动注册到 bean 容器中

## 添加响应式代码

我们在`userInfo`中添加一个响应式属性`user`，并且进行异步初始化

```typescript{3-6,10-22}
import { BeanBase, Store } from '@cabloy/front';

interface User {
  name: string;
  age: number;
}

@Store()
export class StoreUserInfo extends BeanBase {
  user: User;

  protected async __init__() {
    this.user = await this.loadUser();
  }

  private async loadUser(): Promise<User> {
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve({ name: 'tom', age: 18 });
      }, 500);
    });
  }

  protected __dispose__() {}
}
```
