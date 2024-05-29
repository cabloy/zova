# refs

## Template Ref {#template-ref}

## Controller Ref {#controller-ref}

在 Cabloy-Front 中，不使用`Template Ref`引用子组件实例，而是直接引用子组件对应的`controller bean`

### 定义属性

先在父组件的`controller.ts`中定义属性：

```typescript{1,4}
import { ControllerCard } from '../../component/card/controller.js';

export class ControllerPageComponent {
  cardRef: ControllerCard;
}
```

### onControllerRef

然后监听子组件的`onControllerRef`事件获取到`controller bean`的引用值：

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
