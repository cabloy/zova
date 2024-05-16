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

- Since the page component belongs to the module `a-demo`, its absolute path is: `/a/demo/counter`

## name

Generally speaking, a `name` identifier needs to be provided for `dynamic route`. `Dynamic route` means that you can provide `params` parameters on `path`, such as:

```typescript
export const routes: IModuleRoute[] = [
  //
  { name: 'user', path: 'user/:id', component: User },
];
```

- Similarly, the system will also add a module prefix to `name` to generate an absolute name, for example, here is `a-demo:user`

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

`layout` can specify layout component for this route. If `layout` is not set, the default layout component will be used

### System layout components

The system provides two layout components: `empty` and `default`:

| Name    | Description                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| empty   | Empty layout, generally used to display system pages such as Login                                                                         |
| default | The default layout generally provides areas such as Header, Sidebar, and Footer, and page components will be displayed in the Content area |

### Custom layout components

The `empty` and `default` layout components are located in the module `a-homelayout`, and we can modify them according to business needs

## meta.requiresAuth

`requiresAuth` identifies whether the route requires authentication. You can add relevant logic in `Navigation Guards`
