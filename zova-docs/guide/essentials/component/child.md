# Child Component

## Create Child Component

::: tip
Context Menu - [Module Path]: `Zova Create/Component`
:::

Enter the name of the child component according to the prompt, such as `card`, and the VSCode extension will automatically create a file directory `src/component/card`. In Zova, a child component will be splited to four files located in that directory:

```
src
└─ component
   └─ card
      ├─ index.vue
      ├─ controller.ts
      ├─ render.tsx
      └─ style.ts
```

| Name          | Description                     |
| ------------- | ------------------------------- |
| index.vue     | define vue component            |
| controller.ts | local bean for business logic   |
| render.tsx    | local bean for component render |
| style.ts      | local bean for component style  |

## Use Child Component

### General Usage

In the parent component, you can use the child component directly as usual:

```typescript
import Card from '../../component/card/index.vue';

export class RenderComponent {
  render() {
    return (
      <Card></Card>
    );
  }
}
```

### Recommended Usage

Child components created in a module are naturally resources that belong to the module. Zova automatically assigns a unique name (prefixed with `Z`) to each child component for use within the module and across modules

For example, the child component `card` belongs to the module `demo-basic`, so the unique name assigned is `ZCard`, and the child component can be used in the following way:

```typescript
import { ZCard } from '../../index.js';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

- This way can better support automatic import of components

## Use Child Component cross-module

To use the child component `card` of the module `demo-basic` in other modules, you can use the following way:

```typescript
import { ZCard } from 'zova-module-demo-basic';

export class RenderComponent {
  render() {
    return (
      <ZCard></ZCard>
    );
  }
}
```

::: info
Based on the support of the compiler, ZCard will automatically switch to asynchronous loading mode. Specifically, the system will asynchronously load the module `demo-basic`, then obtain the child component `card`, and then render the component
:::
