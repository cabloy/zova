# v-model

It is very convenient to add `v-model` to child components

## Basic Usage

### Initialize code skeleton

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Add v-model`
:::

Enter the name of the model according to the prompt. The default is `modelValue`. The VSCode extension will automatically add the code skeleton of `v-model`

### Access v-model

Access v-model in `render.tsx`:

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

### Use v-model

Next, use the v-model inside the parent component:

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  count: number;
}
```

`parent/render.tsx`

```typescript{5}
export class RenderParent {
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

### Initialize code skeleton

::: tip
Context Menu - [Module Path/src/component/card]: `Zova Refactor/Add v-model`
:::

Enter the name of the model according to the prompt, such as `title`. The VSCode extension will automatically add the code skeleton of `v-model`

### Access v-model

Access v-model in `render.tsx`:

`child/render.tsx`

```typescript{5}
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

### Use v-model

Next, use the v-model inside the parent component:

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  title?: string;
}
```

`parent/render.tsx`

```typescript{5}
export class RenderParent {
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

```typescript{2-4,9-17}
export interface Props {
  titleModifiers?: {
    capitalize: boolean;
  };
}

export class ControllerChild {
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

### Use v-model

Next, use the v-model inside the parent component:

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  title?: string;
}
```

`parent/render.tsx`

```typescript{5}
export class RenderParent {
  render() {
    return (
      <div>
        <Child v-model:title_capitalize={this.title}></Child>
      </div>
    );
  }
}
```
