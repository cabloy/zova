# 路由Query

Zova 对路由`Query`进行了强化，提供了 Typescript 类型化支持

## 创建页面组件

为了完整的演示如何定义和使用类型化的`Query`，这里我们在模块`demo-basic`中创建一个新的页面组件`user`：

::: tip
右键菜单 - [模块路径]: `Zova Create/Page`
:::

## 初始化代码骨架

::: tip
右键菜单 - [模块路径/src/page/user]: `Zova Refactor/Add Page Query`
:::

## 定义Query

在`controller.ts`中定义 Query：

`src/suite/a-demo/modules/demo-basic/src/page/user/controller.ts`

```typescript{2-3}
export const QuerySchema = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});
```

- Zova 对[zod](https://zod.dev)进行了封装，提供了增强版的`zz`对象
- 使用`zz`定义了一个`object`，包含两个字段：`name`和`age`

## 使用Query

在`render.ts`中，可以直接获取 Query，并渲染出来

`src/suite/a-demo/modules/demo-basic/src/page/user/render.tsx`

```typescript{5-6}
export class RenderUser {
  render() {
    return (
      <div>
        <div>{this.$query.name}</div>
        <div>{this.$query.age}</div>
      </div>
    );
  }
}
```

- `$query.name`的类型是`string | undefined`
- `$query.age`的类型是`number | undefined`

## 传入Query

接下来，我们需要在导航路由时传入`Query`参数

直接在页面组件`user`中添加一个按钮，响应单击事件，并采用不同的`Query`参数导航至当前页面。这样，我们可以看到`$query`是响应式的

```typescript{9-11}
export class RenderUser {
  render() {
    return (
      <div>
        <div>{this.$query.name}</div>
        <div>{this.$query.age}</div>
        <button
          onClick={() => {
            const age = (this.$query.age ?? 0) + 1;
            const url = this.$router.resolvePath('/demo/basic/user', { name: 'tom', age });
            this.$router.push(url);
          }}
        >
          Go To Current Page
        </button>
      </div>
    );
  }
}
```

## $query

Zova 在`controller` bean 的基类中注入了`$query`对象，从而可以在 render 实例中通过`this.$query`访问 Query 参数

## 动图演示

![route-query](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-query.gif)
