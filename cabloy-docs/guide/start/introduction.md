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

## Code style demonstration

### 1. Define reactive state

```typescript
@Local()
export class MotherPageCounter extends BeanMotherPageBase {
  counter: number = 0;

  inrement() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
```

### 2. Use reactive state

```typescript
@Local()
export class RenderPageCounter extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>counter(ref): {this.counter}</div>
        <button onClick={() => this.inrement()}>Inrement</button>
        <button onClick={() => this.decrement()}>Decrement</button>
      </div>
    );
  }
}
```
