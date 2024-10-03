# 注入

Zova 通过`@Use`装饰器函数注入 Bean 实例

## 解析规则

Zova 采用模块化体系，Bean Class 都由不同的模块提供。注入模块内部的 Bean 时可以直接基于`Class类型`解析。在跨模块注入时可以基于`Bean标识`解析，而不是基于`Class类型/文件路径`解析，这样有利于实现模块之间的松耦合

因此，Zova 提供了以下几种解析规则：

- Bean Class
- Bean 标识
- 注册名
- 变量名

### 1. Bean Class

通过`Bean Class`在 ioc 容器中查找并注入 Bean 实例，如果不存在则自动创建。这种机制一般用于`同模块注入`

```typescript
import { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

### 2. Bean标识

通过`Bean标识`在 ioc 容器中查找并注入 Bean 实例，如果不存在则自动创建。这种机制一般用于`跨模块注入`和`层级注入`

```typescript
import type { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use('a-tabs.model.tabs')
  $$modelTabs: ModelTabs;
}
```

- 通过`a-tabs.model.tabs`查找并注入 Bean 实例
- 因此，只需导入 ModelTabs 的 type 类型，从而保持模块之间的松耦合关系

为了简化代码，我们仍然可以采用`基于Class类型`的写法，基于编译器的加持，该写法会自动转为`基于Bean标识`的写法。那么优化后的代码风格如下：

```typescript
import { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use()
  $$modelTabs: ModelTabs;
}
```

- 参见：[Bean标识](./bean-identifier.md)

### 3. 注册名

通过`注册名`在 ioc 容器中查找并注入 Bean 实例，如果不存在则返回空值。这种机制一般用于`同模块注入`和`层级注入`

```typescript
import { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use({ name: '$$modelTodo' })
  $$modelTodo: ModelTodo;
}
```

- 通过注册名`$$modelTodo`查找并注入 Bean 实例。一般而言，应该确保在 ioc 容器中已经事先注入过 Bean 实例，否则就会返回空值

### 4. 变量名

通过`变量名`在 ioc 容器中查找并注入 Bean 实例，如果不存在则返回空值。这种机制一般用于`同模块注入`和`层级注入`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

- 通过变量名`$$modelTodo`查找并注入 Bean 实例。一般而言，应该确保在 ioc 容器中已经事先注入过 Bean 实例，否则就会返回空值

## 注入范围

`匿名bean`的默认注入范围都是`ctx`，`具名bean`可以在定义时指定默认注入范围，不同的场景(scene)有不同的默认注入范围。 此外，在实际注入时，还可以在@Use 中通过`injectionScope`选项覆盖默认的注入范围

Zova 提供了以下几种注入范围：`app/ctx/new/host/skipSelf`

### 1. app

如果注入范围是 app，那么就在全局 ioc 容器中注入 bean 实例，从而实现单例的效果

```typescript
// in module: test-module1
@Store()
class StoreCounter {}
```

```typescript
// in module: test-module2
import { StoreCounter } from 'zova-module-test-module1';

class Test {
  @Use()
  $$storeCounter: StoreCounter;
}
```

- Store 的注入范围默认是 app，因此在全局 ioc 容器中查找并注入 bean 实例

### 2. ctx

如果注入范围是 ctx，那么就在当前组件实例的 ioc 容器中注入 bean 实例

```typescript
// in module: a-tabs
@Model()
class ModelTabs {}
```

```typescript
// in module: test-module2
import { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use()
  $$modelTabs: ModelTabs;
}
```

- Model 的注入范围默认是 ctx，因此在当前组件实例的 ioc 容器中查找并注入 bean 实例

### 3. new

如果注入范围是 new，那么就直接创建新的 bean 实例

```typescript
// in module: a-tabs
@Model()
class ModelTabs {}
```

```typescript
// in module: test-module2
import { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use({ injectionScope: 'new' })
  $$modelTabs: ModelTabs;
}
```

- 由于指定 injectionScope 选项为 new，因此直接创建新的 bean 实例

## 层级注入 {#hierarchical-injection}

注入范围除了支持`app/ctx/new`，还支持层级注入：`host/skipSelf`

### 4. host

如果注入范围是 host，那么就在当前组件实例的 ioc 容器以及所有父容器中依次查找并注入 bean 实例，如果不存在则返回空值

```typescript
// in parent component
import { ModelTabs } from 'zova-module-a-tabs';

class Parent {
  @Use()
  $$modelTabs: ModelTabs;
}
```

```typescript
// in child component
import type { ModelTabs } from 'zova-module-a-tabs';

class Child {
  @Use({ injectionScope: 'host' })
  $$modelTabs: ModelTabs;
}
```

- 由于父组件已经注入了 ModelTabs 的 bean 实例，因此子组件可以直接查找并注入
- `层级注入`同样支持所有解析规则

### 5. skipSelf

如果注入范围是 skipSelf，那么就在所有父容器中依次查找并注入 bean 实例，如果不存在则返回空值
