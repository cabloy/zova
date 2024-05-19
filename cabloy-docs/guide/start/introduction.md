# Introduction

## What is Cabloy-Front?

Cabloy-Front is a vue3 framework with ioc container. No `ref/reactive`, no `ref.value`, no `pinia`

## With UI libraries

Cabloy-Front can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including:

- antdv
- element-plus
- quasar
- vuetify

## Features

Cabloy-Front has introduced the following distinct features for Vue3:

1. `No ref/reactive`: Class instances support reactive by default, so the state in the instance does not need to be declared reactive through `ref/reactive`. Additionally, usage of `raw data` and `partially reactive` is still supported
2. `No ref.value`: Without ref, naturally there is no need to write a lot of ref.value
3. `No pinia`: Global state objects can be created directly based on the global IOC container

## Gif demonstration

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## Demonstration: no `ref/reactive`, no `ref.value`

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter%2Fmother.ts)

### 1. Define reactive state

```typescript
export class MotherPageCounter {
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

[![Edit zhennann/cabloy-front-demo-codesandbox/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/zhennann/cabloy-front-demo-codesandbox/main?embed=1&file=%2Fsrc%2Fsuite%2Fa-demo%2Fmodules%2Fa-demo%2Fsrc%2Fpage%2Fcounter2%2Fmother.ts)

### 1. Logic Reuse

Create a `Counter` Bean to implement the logic of `counter`

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
export class MotherPageCounter {
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
