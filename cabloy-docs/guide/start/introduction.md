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

- `No ref/reactive`: Because in most scenarios, there is no need to use ref and reactive
- `No ref.value`: Because defining reactive variables in Cabloy-Front is more intuitive and no longer requires ref semantics
- `No pinia`: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects

## Gif demonstration

![No ref/reactive](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/state-no-ref-reactive.gif)

## Demonstration: no `ref/reactive`, no `ref.value`

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

### 1. Logic Reuse

Create a `Counter` Bean to implement the logic of `counter`

```typescript
@Local()
export class LocalCounter {
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
  $$counter: LocalCounter;
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
