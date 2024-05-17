# Local Bean

Let's create a local bean `testA` and inject it into the local bean `testB`

## Create Local Bean: testA

The code skeleton for local bean can be created using the cli command:

```bash
$ cabloy front:create:local testA --module=a-demo
```

The generated file: `local.testA.ts`, with the following content:

```typescript
import { BeanBase, Local } from '@cabloy/front';

@Local()
export class LocalTestA extends BeanBase {
  protected async __init__() {}

  protected __dispose__() {}
}
```

- `Local` is a decorator function. The class decorated with `Local` will automatically be registered in the bean container

## Add reactive codes

We add a reactive property `counter` in `testA` and add two methods to modify it

```typescript{5-13}
import { BeanBase, Local } from '@cabloy/front';

@Local()
export class LocalTestA extends BeanBase {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

::: info
The property `counter` defined here is reactive, bidding farewell to the writing style of `ref.value`
:::

## Create Local Bean: testB

Next, create the code skeleton for `testB` using the cli command:

```bash
$ cabloy front:create:local testB --module=a-demo
```

Then inject `testA` directly into `testB` and access the properties and methods of `testA`

`local.testB.ts`

```typescript{6-13}
import { BeanBase, Local, Use } from '@cabloy/front';
import { LocalTestA } from './local.testA.js';

@Local()
export class LocalTestB extends BeanBase {
  @Use()
  $$testA: LocalTestA;

  protected async __init__() {
    console.log(this.$$testA.counter);
    this.$$testA.inrement();
    this.$$testA.decrement();
  }
}
```

- `Use` is a decorator function. By the property decorated with `Use`, the system will automatically look up or create an instance in the bean container, and then inject it into `testB`

::: info
`Naming convention`: For properties injected through `Use`, it is recommended to add the prefix `$$`. In this way, when there are too many members in a class, it is also convenient to quickly find the required bean instance
:::
