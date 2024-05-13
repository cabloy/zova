# Route Fields

In [Page Component](../../essentials/component/page.md), we create a page component `counter` through a cli command, which creates a route record. Here we further describe the fields of route records

## List of route fields

| Name      | Description            |
| --------- | ---------------------- |
| path      | route's path           |
| name      | route's name           |
| component | route's page component |
| meta      | route's meta fields    |

- meta

| Name         | Description                  |
| ------------ | ---------------------------- |
| absolute     | Whether absolute path or not |
| layout       | layout component             |
| requiresAuth | Whether auth required        |

## path

`path` is the route path, and the system will automatically add the module prefix to generate an absolute path. For example, the route record of the page component `counter` is as follows:

```typescript
export const routes: IModuleRoute[] = [
  //
  { path: 'counter', component: Counter },
];
```

- Since the page component belongs to the module `test-home`, its absolute path is: `/test/home/counter`

## name

Generally speaking, a `name` identifier needs to be provided for `dynamic route`. `Dynamic route` means that you can provide `params` parameters on `path`, such as:

```typescript
export const routes: IModuleRoute[] = [
  //
  { name: 'user', path: 'user/:id', component: User },
];
```

- Similarly, the system will also add a module prefix to `name` to generate an absolute name, for example, here is `test-home:user`

## component

`component` is a page component, supporting `synchronous components` and `asynchronous components`. Generally speaking, just provide a `synchronization component` as well. Because in Cabloy-Front, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building

## meta.absolute

`absolute` specifies whether the current path is an absolute path. If it is an absolute path, the module prefix will not be added. For example, two absolute routes are defined in the module `a-homepagesystem`:

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

| Name                      | Description                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| path: '/'                 | The function of this route is to jump `'/'` to `'/a/home/home'`, so that we can provide our own homepage |
| path: '/:catchAll(.\*)\*' | Catch all unmatched paths and display a 404 page                                                         |

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
