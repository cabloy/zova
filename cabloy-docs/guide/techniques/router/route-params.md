# Route Params

Cabloy-Front enhances route `Params` and provides Typescript typing support

We still use the page component `user` to fully demonstrate how to define and use typed `Params`

## Define Params

Define Params in `controller.ts`:

`src/suite/a-demo/modules/a-demo/src/page/user/controller.ts`

```typescript{2}
export const ParamsSchema = zz.object({
  id: zz.number().optional().default(0),
});
```

- An `object` is defined using `zz`, containing the field: `id`

## Route name

In order to support `Params`, the `name` field needs to be used on the route record and registered in the module's resources

### 1. Route record

`src/suite/a-demo/modules/a-demo/src/routes.ts`

```typescript{3}
export const routes: IModuleRoute[] = [
  { path: 'card/header2', component: CardHeader2 },
  { name: 'user', path: 'user/:id?', component: User },
];
```

- Set name to `user`, the system automatically adds the module prefix and generates the absolute name `a-demo:user`
- Change path to `user/:id?`

### 2. Resource record

`src/suite/a-demo/modules/a-demo/src/resource/pages.ts`

```typescript{2,6,11-14}
import { TypePageParamsQuery } from '@cabloy/front';
import * as NSMotherPageUser from '../page/user/controller.js';

declare module '@cabloy/front' {
  export interface IPageNameRecord {
    'a-demo:user': TypePageParamsQuery<NSMotherPageUser.QueryInput, NSMotherPageUser.ParamsInput>;
  }
}

export const pageNameSchemas = {
  'a-demo:user': {
    params: NSMotherPageUser.ParamsSchema,
    query: NSMotherPageUser.QuerySchema,
  },
};
```

- Add a record to the `IPageNameRecord` interface and declare the `Params type` corresponding to `a-demo:user`
- Add a record to the `pageNameSchemas` object and declare the `ParamsSchema` corresponding to `a-demo:user`

## Use Params

In `render.ts`, you can directly obtain Params and render its fields

`src/suite/a-demo/modules/a-demo/src/page/user/render.tsx`

```typescript{5}
export class RenderPageUser {
  render() {
    return (
      <div>
        <div>id: {this.$params.id}</div>
      </div>
    );
  }
}
```

- The type of `$params.id` is `number`

## Pass in Params

Next, we need to pass in the `Params` parameter when navigating the route

Still listen to the button click event in the page component `user` and use different `Params` parameter to navigate to the current page. In this way, we can see that `$params` is reactive

```typescript{6-14}
export class RenderPageUser {
  render() {
    return (
      <div>
        <div>id: {this.$params.id}</div>
        <button
          onClick={() => {
            const id = this.$params.id + 1;
            const url = this.$router.resolveName('a-demo:user', { params: { id } });
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

Cabloy-Front injects a `$params` object into the base class of the `controller` bean so that the `Params` parameter can be obtained through `this.$params` in the render instance

## Gif Demonstration

![route-params](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-params.gif)
