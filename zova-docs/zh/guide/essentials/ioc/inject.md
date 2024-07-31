# 注入

Zova 通过`@Use`装饰器函数注入 Bean 实例

## 注入机制

Zova 提供了以下几种注入机制：

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

### 3. 注册名

通过`注册名`在 ioc 容器中查找并注入 Bean 实例，如果不存在则返回空值。这种机制一般用于`同模块注入`和`层级注入`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use({ name: '$$modelTodo' })
  $$modelTodo: ModelTodo;
}
```

- 通过注册名`$$modelTodo`查找并注入 Bean 实例。一般而言，应该确保在 ioc 容器中已经事先注入过 Bean 实例，否则就会返回空值

### 4. 属性名

通过`属性名`在 ioc 容器中查找并注入 Bean 实例，如果不存在则返回空值。这种机制一般用于`同模块注入`和`层级注入`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

- 通过属性名`$$modelTodo`查找并注入 Bean 实例。一般而言，应该确保在 ioc 容器中已经事先注入过 Bean 实例，否则就会返回空值

## 注入范围(containerScope)

`匿名bean`的注入范围都是`ctx`，`具名bean`可以在定义时指定注入范围，不同的场景(scene)有不同的注入范围。 此外，在实际注入时，还可以在@Use 中通过 containerScope 选项覆盖默认的注入范围

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
import type { StoreCounter } from 'zova-module-test-module1';

class Test {
  @Use('test-module1.store.counter')
  $$storeCounter: StoreCounter;
}
```

- Store 的注入范围默认是 app，因此通过 Bean 标识`test-module1.store.counter`在全局 ioc 容器中查找并注入 bean 实例

### 2. ctx

如果注入范围是 ctx，那么就在当前组件实例的 ioc 容器中注入 bean 实例

```typescript
// in module: a-tabs
@Model()
class ModelTabs {}
```

```typescript
// in module: test-module2
import type { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use('a-tabs.model.tabs')
  $$modelTabs: ModelTabs;
}
```

- Model 的注入范围默认是 ctx，因此通过 Bean 标识`a-tabs.model.tabs`在当前组件实例的 ioc 容器中查找并注入 bean 实例

### 3. new

如果注入范围是 new，那么就直接创建新的 bean 实例

```typescript
// in module: a-tabs
@Model()
class ModelTabs {}
```

```typescript
// in module: test-module2
import type { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use({ beanFullName: 'a-tabs.model.tabs', containerScope: 'new' })
  $$modelTabs: ModelTabs;
}
```

- 由于指定 containerScope 选项为 new，因此通过 Bean 标识`a-tabs.model.tabs`直接创建新的 bean 实例

## 层级注入 {#hierarchical-injection}

注入范围 containerScope 除了支持`app/ctx/new`，还支持层级注入：`host/skipSelf`

### 4. host

如果注入范围是 host，那么就在当前组件实例的 ioc 容器以及所有父容器中依次查找并注入 bean 实例，如果不存在则返回空值

```typescript
// in parent component
import type { ModelTabs } from 'zova-module-a-tabs';

class Parent {
  @Use('a-tabs.model.tabs')
  $$modelTabs: ModelTabs;
}
```

```typescript
// in child component
import type { ModelTabs } from 'zova-module-a-tabs';

class Child {
  @Use({ containerScope: 'host' })
  $$modelTabs: ModelTabs;
}
```

- 由于父组件已经注入了 ModelTabs 的 bean 实例，因此子组件可以直接查找并注入
- `层级注入`同样支持所有注入机制：`Bean Class/Bean标识/注册名/属性名`

### 5. skipSelf

如果注入范围是 skipSelf，那么就在所有父容器中依次查找并注入 bean 实例，如果不存在则返回空值
