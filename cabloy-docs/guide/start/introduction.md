# Introduction

## Videos

|                                                                                                           |                                                                                   |                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [![vue3+tsx+ioc new dx: component development][vue3+tsx+ioc-component-image]][vue3+tsx+ioc-component-url] | [![vue3+tsx+ioc new DX: state][vue3+tsx+ioc-state-image]][vue3+tsx+ioc-state-url] | [![Vue3 Route Query How to support typed object parameters][vue3+tsx+ioc-query-object-image]][vue3+tsx+ioc-query-object-url] |
| [![vue3+tsx+ioc new DX: props][vue3+tsx+ioc-props-image]][vue3+tsx+ioc-props-url]                         | [![vue3+tsx+ioc new DX: emits][vue3+tsx+ioc-emits-image]][vue3+tsx+ioc-emits-url] | [![vue3+tsx+ioc new DX: slots][vue3+tsx+ioc-slots-image]][vue3+tsx+ioc-slots-url]                                            |

[vue3+tsx+ioc-component-image]: ../../assets/cover/vue3+tsx+ioc-component.jpg
[vue3+tsx+ioc-component-url]: https://youtu.be/KA4FnJXP4lE
[vue3+tsx+ioc-state-image]: ../../assets/cover/vue3+tsx+ioc-state.jpg
[vue3+tsx+ioc-state-url]: https://youtu.be/56ouTLr7oOg
[vue3+tsx+ioc-query-object-image]: ../../assets/cover/vue3+tsx+ioc-query-object.jpg
[vue3+tsx+ioc-query-object-url]: https://youtu.be/DNTgZ4zSLPk
[vue3+tsx+ioc-props-image]: ../../assets/cover/vue3+tsx+ioc-props.jpg
[vue3+tsx+ioc-props-url]: https://youtu.be/4q5UkDCSB-E
[vue3+tsx+ioc-emits-image]: ../../assets/cover/vue3+tsx+ioc-emits.jpg
[vue3+tsx+ioc-emits-url]: https://youtu.be/m2V7EUyaVEw
[vue3+tsx+ioc-slots-image]: ../../assets/cover/vue3+tsx+ioc-slots.jpg
[vue3+tsx+ioc-slots-url]: https://youtu.be/cgjHrvg21w4

## What is Cabloy-Front?

Cabloy-Front is a vue3 framework with ioc container. With the support of ioc container, defining reactive states no longer needs `ref/reactive`, nor `ref.value`

## With UI libraries

Cabloy-Front can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify

## Features

Cabloy-Front has introduced the following distinct features for Vue3:

1. `No ref/reactive`: With the support of ioc container, defining reactive states no longer needs `ref/reactive`
2. `No ref.value`: Without `ref`, naturally there is no need to write a lot of `ref.value`
3. `Modularization`: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Cabloy-Front introduces modularization

## Gif demonstration

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## Demonstration: no `ref/reactive`, no `ref.value`

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter%2Fcontroller.ts)

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

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter2%2Fcontroller.ts)

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
