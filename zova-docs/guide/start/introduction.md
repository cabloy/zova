# Introduction

## What is Zova?

Zova is a vue3 framework with ioc container. With the support of ioc container, defining reactive states no longer needs `ref/reactive`, nor `ref.value`

## With UI libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify

## Features

Zova has introduced the following distinct features for Vue3:

1. `No ref/reactive`: With the support of ioc container, defining reactive states no longer needs `ref/reactive`
2. `No ref.value`: Without `ref`, naturally there is no need to write a lot of `ref.value`
3. `Modularization`: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization

## Gif demonstration

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## Demonstration: no `ref/reactive`, no `ref.value`

[![Edit zhennann/zova-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/zova-demo-codesandbox/main?checkout=true&embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter%2Fcontroller.ts)

### 1. Define reactive state

Define a reactive variable `count` in the component and add two methods to modify its value

```typescript
export class ControllerPageCounter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. Use reactive state

Use `count` in render class

```typescript
export class RenderPageCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```

## Demonstration: dependency injection

[![Edit zhennann/zova-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/zova-demo-codesandbox/main?checkout=true&embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter2%2Fcontroller.ts)

### 1. Logic Reuse

Create a `Counter` Bean to implement the logic of `count`

```typescript
@Local()
export class Counter {
  count: number = 0;

  inrement() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

### 2. Inject and use in a component

```typescript
export class ControllerPageCounter {
  @Use()
  $$counter: Counter;
}
```

```typescript
export class RenderPageCounter {
  render() {
    return (
      <div>
        <div>count(ref): {this.$$counter.count}</div>
        <button onClick={() => this.$$counter.inrement()}>Inrement</button>
        <button onClick={() => this.$$counter.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
