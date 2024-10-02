# Anonymous bean (Local Bean)

The class decorated with `@Local` is an `anonymous bean`, so it is also called a `local bean`. This type of bean is only used within the module, there is no naming conflict, and it is easy to define and use

In [page component](../component/page.md), we created a page component `counter` through a cli command. Now, we pull out the logic of the `count` state, put it in a local bean to demonstrate the effect of logic reuse

## Create Local Bean: counter

The code skeleton for local bean can be created using the cli command:

```bash
$ zova :create:local page/counter/counter --module=demo-basic
```

- The name of the local bean is `counter`, located in the directory `page/counter`

`src/suite/a-demo/modules/demo-basic/src/page/counter/counter.ts`

```typescript
@Local()
export class Counter {}
```

- `Local` is a decorator function. The class decorated with `Local` will automatically be registered in the bean container

## Add reactive codes

Migrate the code in the page component `counter` to the local bean

```typescript{2-10}
export class Counter {
  count: number = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

::: info
The property `count` defined here is reactive, bidding farewell to the writing style of `ref.value`
:::

## Inject and Use Local Bean

Inject local bean in the page component `counter`, and then access properties and methods in render

`controller.ts`

```typescript{1,4-5}
import { Counter } from './counter.js';

export class ControllerPageCounter {
  @Use()
  $$counter: Counter;
}
```

- `Use` is a decorator function. By the property decorated with `Use`, the system will automatically look up or create an instance in the bean container, and then inject it into page component

`render.tsx`

```typescript{5-7}
export class RenderCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.increment()}>Increment</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## Why do the bean instance variable names use $$ as the prefix

- See: [Why do the bean instance variable names use $$ as the prefix](../../resources/faq.md#faq-$$)
