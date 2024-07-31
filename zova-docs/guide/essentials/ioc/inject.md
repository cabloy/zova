# Inject

Zova injects Bean instances through `@Use` decorator function

## Injection mechanism

Zova provides the following injection mechanisms:

### 1. Bean Class

Use `Bean Class` to lookup and inject bean instance in the ioc container, and automatically create one if not exist. This mechanism is generally used for `same module injection`

```typescript
import { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

### 2. Bean identifier

Use `Bean identifier` to lookup and inject bean instance in the ioc container, and automatically create one if not exist. This mechanism is generally used for `cross-module injection` and `hierarchical injection`

```typescript
import type { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use('a-tabs.model.tabs')
  $$modelTabs: ModelTabs;
}
```

- Lookup and inject bean instance through `a-tabs.model.tabs`
- Therefore, only the type of ModelTabs needs to be imported to maintain the loose coupling relationship between modules

### 3. Registration name

Lookup and inject bean instance in the ioc container through the `registration name`, and return a null value if not exist. This mechanism is generally used for `same module injection` and `hierarchical injection`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use({ name: '$$modelTodo' })
  $$modelTodo: ModelTodo;
}
```

- Lookup and inject the bean instance by the registration name `$$modelTodo`. Generally speaking, you should ensure that the bean instance has been injected in the ioc container in advance, otherwise a null value will be returned

### 4. Property name

Lookup and inject the bean instance in the ioc container by the `property name`, and return a null value if not exist. This mechanism is generally used for `same module injection` and `hierarchical injection`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

- Lookup and inject the bean instance by the property name `$$modelTodo`. Generally speaking, you should ensure that the Bean instance has been injected in the ioc container in advance, otherwise a null value will be returned

## Injection scope(containerScope)

The injection scope of `anonymous bean` is `ctx`, and the injection scope of `named bean` can be specified when defining it. Different scenes have different injection scopes. In addition, when injecting, you can also override the default injection scope through the `containerScope` option in @Use

Zova provides the following injection scopes: `app/ctx/new/host/skipSelf`

### 1. app

If the injection scope is `app`, then inject the bean instance in the global ioc container to achieve the singleton effect

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

- The injection scope of `Store` is `app` by default, so the bean instance will be lookuped and injected in the global ioc container through the bean identifier `test-module1.store.counter`

### 2. ctx

If the injection scope is `ctx`, then inject the bean instance into the ioc container of the current component instance

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

- The injection scope of `Model` is `ctx` by default, so the bean instance will be lookuped and injected in the ioc container of the current component instance through the bean identifier `a-tabs.model.tabs`

### 3. new

If the injection scope is `new`, then directly create a new bean instance

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

- Since the `containerScope` option is specified as `new`, a new bean instance will be directly created through the bean identifier `a-tabs.model.tabs`

## 层级注入

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
- `层级注入`同样支持所有注入机制：`Bean Class/Bean标识/变量名/属性名`

### 5. skipSelf

如果注入范围是 skipSelf，那么就在所有父容器中依次查找并注入 bean 实例，如果不存在则返回空值
