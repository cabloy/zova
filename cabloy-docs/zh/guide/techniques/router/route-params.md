# 路由Params

Cabloy-Front 对路由`Params`进行了强化，提供了 Typescript 类型化支持

我们仍然使用页面组件`user`完整的演示如何定义和使用类型化的`Params`

## 定义Params

在`mother.ts`中定义 Params：

`src/module/test-demo/src/page/user/mother.ts`

```typescript{4-5}
import { zz } from '@cabloy/front';

export const ParamsSchema = zz.object({
  id: zz.number().optional().default(0),
});
```

- 使用`zz`定义了一个`object`，包含字段：`id`

## 路由name

为了支持 Params，需要在路由记录上使用`name`字段，并且登记在模块的资源中

### 1. 路由记录

`src/module/test-demo/src/routes.ts`

```typescript{3}
export const routes: IModuleRoute[] = [
  { path: 'card/header2', component: CardHeader2 },
  { name: 'user', path: 'user/:id?', component: User },
];
```

- name 设为`user`，系统自动添加模块前缀，生成绝对名称`test-demo:user`
- path 改为`user/:id?`

### 2. 资源记录

`src/module/test-demo/src/resource/pages.ts`

```typescript{1,4-7}
import * as NSMotherPageUser from '../page/user/mother.js';
import { TypePageParamsQuery } from '@cabloy/front';

declare module '@cabloy/front' {
  export interface IPageNameRecord {
    'test-demo:user': TypePageParamsQuery<NSMotherPageUser.QueryInput, NSMotherPageUser.ParamsInput>;
  }
}

export const pageNameSchemas = {
  'test-demo:user': {
    params: NSMotherPageUser.ParamsSchema,
    query: NSMotherPageUser.QuerySchema,
  },
};
```

- 向`IPageNameRecord`接口添加记录，声明`test-demo:user`对应的`Params类型`
- 向`pageNameSchemas`对象添加记录，声明`test-demo:user`对应的`ParamsSchema`

## 使用Params

在`render.ts`中，可以直接获取 Params，并渲染出来

`src/module/test-demo/src/page/user/render.tsx`

```typescript{6}
@Local()
export class RenderPageUser extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>id: {this.$params.id}</div>
      </div>
    );
  }
}
```

- `$params.id`的类型是`number`

## 传入Params

接下来，我们需要在导航路由时传入`Params`参数

仍然响应页面组件`user`中的按钮单击事件，并采用不同的`Params`参数导航至当前页面。这样，我们可以看到`$params`是响应式的

```typescript{12-20}
@Local()
export class RenderPageUser extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div>
        <div>
          name: {this.$query.name}, {typeof this.$query.name}
        </div>
        <div>
          age: {this.$query.age}, {typeof this.$query.age}
        </div>
        <button
          onClick={() => {
            const age = (this.$query.age ?? 0) + 1;
            const url = this.$router.resolvePath('/test/demo/user', { name: 'tom', age });
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

Cabloy-Front 在`mother` bean 的基类中注入了`$query`对象，从而可以在 render 实例中通过`this.$query`访问 Query 参数

## 动图演示

![route-query](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-query.gif)
