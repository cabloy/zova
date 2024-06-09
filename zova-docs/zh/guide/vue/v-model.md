# v-model

## 基本用法

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

- line 2: 定义 Prop `modelValue`
- line 3: 定义 Emit `update:modelValue`
- line 11: 设置 Prop `modelValue`的缺省值
- line 13: 声明一个本地变量`modelValue`
- line 16: 调用`$useModel`方法生成一个代理对象，并赋值给`modelValue`

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

- 本地变量`modelValue`可实现与父组件的双向绑定。修改`modelValue`的值会触发父组件绑定的值同步更新

`parent/controller.ts`

```typescript
export class ControllerPageParent {
  count: number;
}
```

`parent/render.ts`

```typescript
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

- 直接使用`v-model`绑定变量即可

## v-model参数

`modelValue`是默认的 model 参数，我们也可以指定其他 model 参数

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

## v-model修饰符

v-model 支持修饰符。我们来创建一个自定义的修饰符 capitalize，它会自动将 v-model 绑定值的首字母转为大写：

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

- 添加 Prop `titleModifiers`，并且定义一个修饰符`capitalize`
- 调用`$useModel`方法时传入 set 选项。在 set 选项中判断`capitalize`的值对`value`做相应的处理

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
