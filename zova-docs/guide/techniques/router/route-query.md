# Route Query

Zova enhances route `Query` and provides Typescript typing support

## Create Page Component

In order to fully demonstrate how to define and use typed `Query`, here we create a new page component `user` in the module `demo-basic`:

::: tip
Context Menu - [Module Path]: `Zova Create/Page`
:::

## Initialize code skeleton

::: tip
Context Menu - [Module Path/src/page/user]: `Zova Refactor/Add Page Query`
:::

## Define Query

Define Query in `controller.ts`:

`src/suite/a-demo/modules/demo-basic/src/page/user/controller.ts`

```typescript{2-3}
export const QuerySchema = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});
```

- Zova encapsulates [zod](https://zod.dev) and provides an enhanced version of `zz` object
- An `object` is defined using `zz`, containing two fields: `name` and `age`

## Use Query

In `render.ts`, you can directly obtain Query and render its fields

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

- The type of `$query.name` is `string | undefined`
- The type of `$query.age` is `number | undefined`

## Pass in Query

Next, we need to pass in the `Query` parameter when navigating the route

Add a button directly to the page component `user`, listen to the click event, and use different `Query` parameter to navigate to the current page. In this way, we can see that `$query` is reactive

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

Zova injects a `$query` object into the base class of the `controller` bean so that the `Query` parameter can be obtained through `this.$query` in the render instance

## Gif Demonstration

![route-query](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-query.gif)
