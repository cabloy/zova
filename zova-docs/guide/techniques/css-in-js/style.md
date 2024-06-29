# $style

Zova provides a core module `a-style`, which provides `css-in-js` capabilities based on [TypeStyle](https://github.com/typestyle/typestyle)

Zova has injected the `$style` method in the `BeanBase` base class so that css-in-js capabilities can be accessed in any bean instance through `this.$style`

## Scope style

- Basic principle: `this.$style` uses a hash algorithm to generate a unique className through the passed style parameters, thereby avoiding naming conflicts. In order to facilitate troubleshooting, the module name prefix is ​​automatically added to the generated className during the development stage

```typescript
export class RenderTest extends BeanRenderBase {
  textCenter: string;

  protected async __init__() {
    this.textCenter = this.$style({ textAlign: 'center' });
  }

  render() {
    return (
      <div class={this.textCenter}>Hello Zova</div>
    );
  }
}
```

- Generate className through `this.$style` and assign it to `this.textCenter`
- Use `this.textCenter` directly in rendering code

## Dynamic style

Computed properties can be used to create dynamic styles

```typescript
export class RenderTest extends BeanRenderBase {
  active: boolean;
  textColor: string;

  protected async __init__() {
    this.textColor = useComputed(() => {
      return this.$style({ color: this.active ? 'orange' : '' });
    });
  }

  render() {
    return (
      <div class={this.textColor}>Hello Zova</div>
    );
  }
}
```

- Use `useComputed` to create a computed property
- Generate different classNames based on the changed value of `this.active`
