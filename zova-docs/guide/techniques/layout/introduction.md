# Layout

Zova provides a general layout mechanism through the module `home-layout`. Multiple layout components can be created in the module `home-layout`, and you can specify which one to use in `page route`

### System layout components

In order to achieve out-of-the-box effects, the system has two built-in layout components: `empty` and `default`:

| Name    | Description                                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| empty   | Empty layout, generally used to display system pages such as Login                                                                                    |
| default | The default layout generally provides blocks such as Header, Sidebar, Footer, and Content, and page components will be displayed in the Content block |

- Custom layout components

The `empty` and `default` layout components are located in the module `home-layout`, and we can modify them according to business needs

## Use layout components

Just specify which layout component to use in `Page Route`. If not specified, the `default` layout component will be used by default

### Example: 404 page

`src/suite/a-home/modules/home-base/src/routes.ts`

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

### Example: General page

`src/suite/a-demo/modules/demo-basic/src/routes.ts`

```typescript{2-3}
export const routes: IModuleRoute[] = [
  { path: 'state', component: State },
  { path: 'component', component: Component },
];
```
