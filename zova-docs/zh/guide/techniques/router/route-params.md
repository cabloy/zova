# 路由Params

Zova 对路由`Params`进行了强化，提供了 Typescript 类型化支持

我们仍然使用页面组件`user`完整的演示如何定义和使用类型化的`Params`

## 初始化代码骨架

::: tip
右键菜单 - [模块路径/src/page/user]: `Zova Refactor/Add Page Params`
:::

## 定义Params

在`controller.ts`中定义 Params：

`src/suite/a-demo/modules/demo-basic/src/page/user/controller.ts`

```typescript{2}
export const ParamsSchema = zz.object({
  id: zz.number().optional().default(0),
});
```

- 使用`zz`定义了一个`object`，包含字段：`id`

## 路由name

为了支持 Params，需要在路由记录上使用`name`字段，并且重新生成模块的`.metadata`

### 1. 路由记录

`src/suite/a-demo/modules/demo-basic/src/routes.ts`

```typescript{3}
export const routes: IModuleRoute[] = [
  { path: 'card/header2', component: CardHeader2 },
  { name: 'user', path: 'user/:id?', component: User },
];
```

- name 设为`user`，系统自动添加模块前缀，生成绝对名称`demo-basic:user`
- path 改为`user/:id?`

### 2. 重新生成模块的.metadata

::: tip
右键菜单 - [模块路径]: `Zova Tools/Generate .metadata`
:::

## 使用Params

在`render.ts`中，可以直接获取 Params，并渲染出来

`src/suite/a-demo/modules/demo-basic/src/page/user/render.tsx`

```typescript{5}
export class RenderUser {
  render() {
    return (
      <div>
        <div>{this.$params.id}</div>
      </div>
    );
  }
}
```

- `$params.id`的类型是`number`

## 传入Params

接下来，我们需要在导航路由时传入`Params`参数

仍然响应页面组件`user`中的按钮单击事件，并采用不同的`Params`参数导航至当前页面。这样，我们可以看到`$params`是响应式的

```typescript{8-10}
export class RenderUser {
  render() {
    return (
      <div>
        <div>{this.$params.id}</div>
        <button
          onClick={() => {
            const id = this.$params.id + 1;
            const url = this.$router.resolveName('demo-basic:user', { params: { id } });
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

## $params

Zova 在`controller` bean 的基类中注入了`$params`对象，从而可以在 render 实例中通过`this.$params`访问 Params 参数

## 动图演示

![route-params](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-params.gif)
