# Local Bean

Let's create a local bean `testA` and inject it into the local bean `testB`

## Create Local Bean: testA

The code skeleton for local bean can be created using the cli command:

```bash
$ cabloy front:create:local testA --module=a-demo
```

The generated file: `testA.ts`, with the following content:

```typescript
@Local()
export class TestA {}
```

- `Local` is a decorator function. The class decorated with `Local` will automatically be registered in the bean container

## Add reactive codes

We add a reactive property `count` in `testA` and add two methods to modify it

```typescript{2-10}
export class TestA {
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
The property `count` defined here is reactive, bidding farewell to the writing style of `ref.value`
:::

## Create Local Bean: testB

Next, create the code skeleton for `testB` using the cli command:

```bash
$ cabloy front:create:local testB --module=a-demo
```

Then inject `testA` directly into `testB` and access the properties and methods of `testA`

`testB.ts`

```typescript{1,4-11}
import { TestA } from './testA.js';

export class TestB {
  @Use()
  $$testA: TestA;

  protected async __init__() {
    console.log(this.$$testA.count);
    this.$$testA.inrement();
    this.$$testA.decrement();
  }
}
```

- `Use` is a decorator function. By the property decorated with `Use`, the system will automatically look up or create an instance in the bean container, and then inject it into `testB`

## Why do the bean instance variable names use $$ as the prefix

- See: [Why do the bean instance variable names use $$ as the prefix](../../resources/faq.md#faq-$$)
