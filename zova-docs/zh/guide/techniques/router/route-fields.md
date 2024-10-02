# 路由字段

在[页面组件](../../essentials/component/page.md)中，我们通过一个 cli 命令创建了一个页面组件`counter`，该命令创建了一个路由记录。这里我们进一步讲述路由记录的字段配置

## 路由字段清单

| 名称      | 说明       |
| --------- | ---------- |
| path      | 路由路径   |
| name      | 路由名称   |
| component | 页面组件   |
| alias     | 路由别名   |
| meta      | 路由元数据 |

- meta

| 名称         | 说明           |
| ------------ | -------------- |
| absolute     | 是否为绝对路径 |
| layout       | 布局组件       |
| requiresAuth | 是否需要认证   |

## path

`path`是路由路径，系统会自动添加模块前缀，生成绝对路径。比如，页面组件`counter`的路由记录如下：

```typescript
export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- 由于该页面组件属于模块`demo-basic`，其绝对路径就是: `/demo/basic/counter`

## name

一般而言，需要为`动态路由`提供`name`标识。`动态路由`就是可以在`path`上提供 `params`参数，比如：

```typescript
export const routes: IModuleRoute[] = [
  //
  { name: 'user', path: 'user/:id', component: User },
];
```

- 同样，系统也会为`name`添加模块前缀，生成绝对名称，比如这里就是`demo-basic:user`

## component

`component`就是页面组件，支持`同步组件`和`异步组件`。一般而言，只需提供`同步组件`即可。因为在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk

## alias

可以为路由指定别名。但是不能在模块的路由记录中指定路由别名，而是必须在全局 Config 中指定

- 参见：[路由别名](./route-alias.md)

## meta.absolute

`absolute`指定当前 path 是否为绝对路径。如果是绝对路径就不会添加模块前缀。比如，在模块`home-pagesystem`中定义了两个绝对路由：

```typescript
import ErrorNotFound from './page/errorNotFound/index.vue';
import { IModuleRoute } from 'zova-module-a-router';

export const routes: IModuleRoute[] = [
  {
    path: '/',
    redirect: '/home/index',
    meta: {
      absolute: true,
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
    meta: {
      absolute: true,
      layout: 'empty',
    },
  },
];
```

| 名称                      | 说明                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| path: '/'                 | 该路由的作用是将`'/'`跳转至`'/home/index'`，从而方便我们提供自己的首页 |
| path: '/:catchAll(.\*)\*' | 捕获所有未匹配路径，显示404页面                                         |

## meta.layout

`layout`可以为该路由指定布局组件，如果不设置`layout`就会使用默认的布局组件

- 参见：[Layout布局](../layout/introduction.md)

## meta.requiresAuth

`requiresAuth`标识该路由是否需要认证，可以在`导航守卫`中添加相关的逻辑
