# Layout布局

Zova 通过模块`home-layout`提供了通用的布局机制。在模块`home-layout`中可以创建多个布局组件，在`页面路由`中指定使用哪一个即可

## 系统布局组件

为了达到开箱即用的效果，系统内置了两个布局组件:`empty`和`default`:

| 名称    | 说明                                                                                        |
| ------- | ------------------------------------------------------------------------------------------- |
| empty   | 空布局，一般用于显示Login等系统页面                                                         |
| default | 默认布局，一般会提供Header、Sidebar、Footer、Content等区块，页面组件通常会在Content区块显示 |

- 自定义布局组件

`empty`和`default`布局组件位于模块`home-layout`中，我们可以根据业务需求自行修改

## 使用布局组件

只需在`页面路由`中指定使用哪个布局组件即可。如果没有指定，就默认使用`default`布局组件

### 举例：404页面

`src/suite/a-home/modules/home-pagesystem/src/routes.ts`

```typescript{7}
export const routes: IModuleRoute[] = [
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

### 举例：业务页面

`src/suite/a-demo/modules/demo-basic/src/routes.ts`

```typescript{2-3}
export const routes: IModuleRoute[] = [
  { path: 'state', component: State },
  { path: 'component', component: Component },
];
```
