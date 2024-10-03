# Inject

Zova injects Bean instances through `@Use` decorator function

## Resolution rules

Zova adopts a modular system, and Bean Classes are provided by different modules. When using the Bean Class inside the same module, you can directly resolve it based on `Class type`. When using cross-module, you can resolve it based on `Bean identifier` instead of `Class type/file path`, which is conducive to achieving loose coupling between modules

Therefore, Zova provides the following resolution rules:

- Bean Class
- Bean identifier
- Registration name
- Variable name

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

In order to simplify the code, we can still use the `Class-type-based` code style. Based on the support of the compiler, this `Class-type-based` code style will automatically be converted to the `Bean-identifier-based` code style. Then the optimized code style is as follows:

```typescript
import { ModelTabs } from 'zova-module-a-tabs';

class ControllerLayout {
  @Use()
  $$modelTabs: ModelTabs;
}
```

- See: [Bean Identifier](./bean-identifier.md)

### 3. Registration name

Lookup and inject bean instance in the ioc container through the `registration name`, and return a null value if not exist. This mechanism is generally used for `same module injection` and `hierarchical injection`

```typescript
import { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use({ name: '$$modelTodo' })
  $$modelTodo: ModelTodo;
}
```

- Lookup and inject the bean instance by the registration name `$$modelTodo`. Generally speaking, you should ensure that the bean instance has been injected in the ioc container in advance, otherwise a null value will be returned

### 4. Variable name

Lookup and inject the bean instance in the ioc container by the `variable name`, and return a null value if not exist. This mechanism is generally used for `same module injection` and `hierarchical injection`

```typescript
import type { ModelTodo } from '../../bean/model.todo.js';

class ControllerTodo {
  @Use()
  $$modelTodo: ModelTodo;
}
```

- Lookup and inject the bean instance by the variable name `$$modelTodo`. Generally speaking, you should ensure that the Bean instance has been injected in the ioc container in advance, otherwise a null value will be returned

## Injection scope

The default injection scope of `anonymous bean` is `ctx`, and the default injection scope of `named bean` can be specified when defining it. Different scenes have different default injection scopes. In addition, when injecting, you can also override the default injection scope through the `injectionScope` option in @Use

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
import { StoreCounter } from 'zova-module-test-module1';

class Test {
  @Use()
  $$storeCounter: StoreCounter;
}
```

- The injection scope of `Store` is `app` by default, so the bean instance will be lookuped and injected in the global ioc container

### 2. ctx

If the injection scope is `ctx`, then inject the bean instance into the ioc container of the current component instance

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

- The injection scope of `Model` is `ctx` by default, so the bean instance will be lookuped and injected in the ioc container of the current component instance

### 3. new

If the injection scope is `new`, then directly create a new bean instance

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

- Since the `injectionScope` option is specified as `new`, a new bean instance will be directly created

## Hierarchical injection {#hierarchical-injection}

Injection scope supports not only `app/ctx/new`, but also `host/skipSelf` which is called `hierarchical injection`

### 4. host

If the injection scope is `host`, the bean instance will be lookuped in the ioc container of the current component instance and all parent containers in turn. If it does not exist, a null value is returned

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

- Since the parent component has already injected the `ModelTabs` bean instance, the child component can directly lookup and inject it
- `Hierarchical injection` also supports all resolution rules

### 5. skipSelf

If the injection scope is `skipSelf`, then lookup the bean instance in all parent containers in turn. If it does not exist, a null value is returned
