# Named Bean: General

Except for `@Local`, the classes decorated by the other decorator functions are `named beans`. Zova provides a naming convention for such beans, which can avoid naming conflicts and facilitate cross-module usage

In essence, we only need to define all `named beans` through a general decorator function `@Bean`. Other decorator functions are derived from `@Bean` to provide different default parameters

## @Bean

For example, to define a store bean `userInfo`, there are two ways:

```typescript
@Store()
export class StoreUserInfo {}
```

```typescript
@Bean({ scene: 'store', name: 'userInfo', containerScope: 'app' })
export class StoreUserInfo {}
```

- scene
  - Optional
  - Default: `bean`
  - Bean scene value, used to classify beans
- name
  - Optional
  - Default: automatically resolved from class name
  - Bean name
- containerScope
  - Optional
  - Default: `ctx`
  - When injecting this bean into other bean instances, if containerScope is not explicitly specified, the value specified here is used

## Bean Identifier

In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building

Therefore, when using `named bean` cross-module, we do not recommend injecting directly based on `type`, but rather on `identifier`

The system will automatically assign an identifier to each `named bean` as the following format:

```bash
{moduleName}.{scene}.{name}
```

For example, the previously created store bean `userInfo` corresponds to the identifier `demo-basic.store.userInfo`, where `demo-basic` is the module name which `userInfo` belongs to

## Decorator list

For ease of use and to simplify the code, Zova provides several derived `named beans`:

| Name   | Description                                                          | scene | default containerScope |
| ------ | -------------------------------------------------------------------- | ----- | ---------------------- |
| @Bean  | General decorator                                                    | bean  | ctx                    |
| @Model | [Model: Unified Data Source](../../techniques/model/introduction.md) | model | ctx                    |
| @Store | [Global state object](./store-bean.md)                               | store | app                    |
| @Style | [Global style](../../techniques/css-in-js/class.md)                  | style | app                    |
| @Theme | [Theme](../../techniques/css-in-js/theme.md)                         | theme | app                    |
| @Tool  | Tool Bean                                                            | tool  | app                    |
