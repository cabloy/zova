# v-model

## Basic Usage

`child/controller.ts`

```typescript
export interface Props {
  modelValue: number;
}

export type Emits = {
  (e: 'update:modelValue', value: number);
};

export class ControllerChild {
  static $propsDefault = {
    modelValue: 0,
  };
  modelValue: number;

  protected async __init__() {
    this.modelValue = this.$useModel();
  }
}
```

- line 2: Define Prop `modelValue`
- line 3: Define Emit `update:modelValue`
- line 11: Set the default value of Prop `modelValue`
- line 13: Declare a local variable `modelValue`
- line 16: Call the `$useModel` method to generate a proxy object and assign it to `modelValue`

`child/render.tsx`

```typescript{5,8}
export class RenderChild {
  render() {
    return (
      <div>
        <div>{this.modelValue}</div>
        <button
          onClick={() => {
            this.modelValue++;
          }}
        >
          Change
        </button>
      </div>
    );
  }
}
```

- The local variable `modelValue` can achieve two-way binding with the parent component. Modifying the value of `modelValue` will trigger the synchronous update of the value bound to the parent component

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  count: number;
}
```

`parent/render.ts`

```typescript
export class RenderPageParent {
  render() {
    return (
      <div>
        <Child v-model={this.count}></Child>
      </div>
    );
  }
}
```

- Just use `v-model` to bind a variable

## v-model arguments

`modelValue` is the default model parameter, we can also specify other model parameters

`child/controller.ts`

```typescript
export interface Props {
  title?: string;
}

export type Emits = {
  (e: 'update:title', value?: string);
};

export class ControllerChild {
  modelTitle?: string;

  protected async __init__() {
    this.modelTitle = this.$useModel('title');
  }
}
```

`child/render.tsx`

```typescript
export class RenderChild {
  render() {
    return (
      <div>
        <input v-model={this.modelTitle} />
      </div>
    );
  }
}
```

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  title?: string;
}
```

`parent/render.ts`

```typescript{5}
export class RenderPageParent {
  render() {
    return (
      <div>
        <Child v-model:title={this.title}></Child>
      </div>
    );
  }
}
```

## v-model modifiers

v-model supports modifiers. Let's create a custom modifier `capitalize`, which will automatically capitalize the first letter of the v-model binding value:

`child/controller.ts`

```typescript{3-5,18}
export interface Props {
  title?: string;
  titleModifiers?: {
    capitalize: boolean;
  };
}

export type Emits = {
  (e: 'update:title', value?: string);
};

export class ControllerChild {
  modelTitle?: string;

  protected async __init__() {
    this.modelTitle = this.$useModel('title', {
      set: value => {
        if (this.$props.titleModifiers?.capitalize) {
          if (!value) return value;
          return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
      },
    });
  }
}
```

- Add Prop `titleModifiers` and define a modifier `capitalize`
- When calling the `$useModel` method, pass in the `set` option. In the `set` option, determine the value of `capitalize` and handle `value` accordingly

`child/render.tsx`

```typescript
export class RenderChild {
  render() {
    return (
      <div>
        <input v-model={this.modelTitle} />
      </div>
    );
  }
}
```

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  title?: string;
}
```

`parent/render.ts`

```typescript{5}
export class RenderPageParent {
  render() {
    return (
      <div>
        <Child v-model:title_capitalize={this.title}></Child>
      </div>
    );
  }
}
```
