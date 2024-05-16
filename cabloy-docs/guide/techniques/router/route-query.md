# Route Query

Cabloy-Front enhances route `Query` and provides Typescript typing support

## Create Page Component

In order to fully demonstrate how to define and use typed `Query`, here we create a new page component `user` in the module `a-demo`:

```bash
$ cabloy front:create:page user --module=a-demo
```

## Define Query

Define Query in `mother.ts`:

`src/module/a-demo/src/page/user/mother.ts`

```typescript{4-5}
import { zz } from '@cabloy/front';

export const QuerySchema = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});
```

- Cabloy-Front encapsulates [zod](https://zod.dev) and provides an enhanced version of `zz` object
- An `object` is defined using `zz`, containing two fields: `name` and `age`

## Use Query

In `render.ts`, you can directly obtain Query and render its fields

`src/module/a-demo/src/page/user/render.tsx`

```typescript{6-11}
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

Cabloy-Front injects a `$query` object into the base class of the `mother` bean so that the `Query` parameter can be obtained through `this.$query` in the render instance

## Gif Demonstration

![route-query](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/route-query.gif)
