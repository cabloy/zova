# 路由字段

在[页面组件](../../essentials/component/page.md)中，我们通过一个 cli 命令创建了一个页面组件`counter`，该命令创建了一个路由记录。这里我们进一步讲述路由记录的字段配置

## 路由字段清单

| 名称      | 说明       |
| --------- | ---------- |
| path      | 路由路径   |
| name      | 路由名称   |
| component | 页面组件   |
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

- 由于该页面组件属于模块`test-home`，其绝对路径就是: `/test/home/counter`

## name

一般而言，需要为`动态路由`提供`name`标识。`动态路由`就是可以在`path`上提供 `params`参数，比如：

```typescript
export const routes: IModuleRoute[] = [
  //
  { name: 'user', path: 'user/:id', component: User },
];
```

- 同样，系统也会为`name`添加模块前缀，生成绝对名称，比如这里就是`test-home:user`

## component

`component`就是页面组件，支持`同步组件`和`异步组件`。一般而言，只需提供`同步组件`即可。因为在 Cabloy-Front 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk

## meta.absolute

`absolute`指定当前 path 是否为绝对路径。如果是绝对路径就不会添加模块前缀。比如，在模块`a-homepagesystem`中定义了两个绝对路由：

```typescript
import ErrorNotFound from './page/errorNotFound/index.vue';
import { IModuleRoute } from 'cabloy-module-front-a-router';

export const routes: IModuleRoute[] = [
  {
    path: '/',
    redirect: '/a/home/home',
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
| path: '/'                 | 该路由的作用是将`'/'`跳转至`'/a/home/home'`，从而方便我们提供自己的首页 |
| path: '/:catchAll(.\*)\*' | 捕获所有未匹配路径，显示404页面                                         |

## meta.layout

`layout`可以为该路由指定布局组件，如果不设置`layout`就会使用默认的布局组件

### 系统布局组件

系统提供了两个布局组件:`empty`和`default`:

| 名称    | 说明                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| empty   | 空布局，一般用于显示Login等系统页面                                            |
| default | 默认布局，一般会提供Header、Sidebar、Footer等区域，页面组件会在Content区域显示 |

### 自定义布局组件

`empty`和`default`布局组件位于模块`a-homelayout`中，我们可以根据业务需求自行修改

## meta.requiresAuth

`requiresAuth`标识该路由是否需要认证，可以在`导航守卫`中添加相关的逻辑
