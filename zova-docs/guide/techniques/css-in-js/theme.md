# $theme

Zova provides a theme definition and usage mechanism that is independent of UI libraries, and provides out-of-the-box theme switching capabilities

## Two dimensions

Zova provides two dimensions of theme switching capabilities:

- `Light/dark mode`: Provides switching between three modes: `light/dark/auto`
- `Brand style`: Provides brand style switching, generally focusing on brand color switching, of course, it can also include other styles of customization

## $theme

Zova injects the `$theme` object into the `BeanBase` base class, so that theme can be operated on any bean instance through `this.$theme`

- $theme properties

| Name     | Accessibility | Description                            |
| -------- | ------------- | -------------------------------------- |
| name     | read-write    | Theme name                             |
| darkMode | read-write    | The current dark mode: auto/true/false |
| dark     | read-only     | The current dark status: true/false    |
| token    | read-write    | Token values of the current theme      |

- $theme methods

| Name       | Description                         |
| ---------- | ----------------------------------- |
| toggleDark | Switch between light and dark modes |

## Default theme

Every UI library provides a default theme bean. Theme beans provide the following capabilities:

1. Provide token values: Different theme colors can be configured in the token values, and more customized styles can also be provided
2. More in-depth theme customization can be done through code

The following is the default theme bean used by Zova when developing/tests:

`zova-dev/src/suite/a-home/modules/home-theme/src/bean/theme.default.ts`

```typescript
@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#1976d2',
      },
      var: {
        borderColor: '#297acc',
      },
      component: {
        page: {
          background: dark ? '#121212' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      },
    };
    return { token };
  }
}
```

- Theme Bean implements the `ThemeBase` interface
- Just provide the `apply` method. When switching themes, the `apply` method will be automatically invoked

## Custom theme

Then, next, you can create a new theme bean by referring to the default theme bean

### Cli command

Theme beans can be created through Cli commands. For example, create a theme Bean `orange` in the `demo-basic` module

```bash
$ zova :create:theme orange --module=demo-basic
```

- This command will automatically create a Bean file: `demo-basic/src/bean/theme.orange.ts`, and the corresponding Bean identifier is: `a-demo.theme.orange`

### Custom apply method

```typescript
@Theme()
export class ThemeOrange extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {
      color: {
        primary: '#f28238',
      },
      var: {
        borderColor: '#f28d49',
      },
      component: {
        page: {
          background: dark ? '#121212' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      },
    };
    return { token };
  }
}
```

### Switch theme

Next, you can dynamically switch the theme in the code

```typescript
export class RenderTest extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>name: {this.$theme.name}</div>
        <div>dark: {String(this.$theme.dark)}</div>
        <div>dark mode: {String(this.$theme.darkMode)}</div>
        <button onClick={() => {
            this.$theme.name =
              this.$theme.name === 'home-theme.theme.default'
                ? 'a-demo.theme.orange'
                : 'home-theme.theme.default';
          }}
        >
          Toggle Theme
        </button>
      </div>
    );
  }
}
```
