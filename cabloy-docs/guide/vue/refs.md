# refs

## Template Ref {#template-ref}

## Controller Ref {#controller-ref}

In Cabloy-Front, `Template Ref` is not used to refer to child component instances, but directly refers to the `controller bean` corresponding to the child component

### Define Property

First define a property in `controller.ts` of the parent component:

```typescript{1,4}
import { ControllerCard } from '../../component/card/controller.js';

export class ControllerPageComponent {
  cardRef: ControllerCard;
}
```

### onControllerRef

Then listen to the `onControllerRef` event of the child component to obtain the ref value of the `controller bean`:

```typescript{6-8}
export class RenderPageComponent {
  render() {
    return (
      <div>
        <Card
          onControllerRef={ref => {
            this.cardRef = ref;
          }}
        ></Card>
      </div>
    );
  }
}
```
