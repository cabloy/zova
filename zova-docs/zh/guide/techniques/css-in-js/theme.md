# $theme

Zova 提供了与 UI 库无关的 theme 定义与使用机制，并且提供开箱即用的 theme 切换能力

## 两个维度

Zova 提供了两个维度的主题切换能力：

- `明暗模式`：提供`明色/暗色/自动`三种模式的切换
- `品牌风格`：提供品牌风格的切换，一般以品牌色切换为主，当然还可以包含其他样式的定制

## $theme

Zova 在 BeanBase 基类中注入了`$theme`对象，从而可以在任何 bean 实例中通过`this.$theme`对 theme 进行操作

- $theme 属性

| 名称     | 访问性 | 说明                          |
| -------- | ------ | ----------------------------- |
| name     | 读写   | 主题名称                      |
| darkMode | 读写   | 当前明暗模式：auto/true/false |
| dark     | 只读   | 当前明暗状态：true/false      |
| token    | 读写   | 当前主题提供的token值         |

- $theme 方法

| 名称       | 说明         |
| ---------- | ------------ |
| toggleDark | 切换明暗模式 |

## 缺省主题

每一个 UI 库都提供了一个缺省主题 Bean。通过主题 Bean 可以提供以下能力：

1. 提供 token 值：在 token 值中可以配置不同的主题色，也可以提供更多的定制样式
2. 可以通过代码进行更深度的主题定制

下面是 Zova 开发测试时所使用的缺省主题 Bean：

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

- 主题 Bean 实现了 ThemeBase 接口
- 只需提供 apply 方法。在进行主题切换时，会自动调用 apply 方法

## 自定义主题

那么，接下来，就可以参照缺省主题 Bean 来创建一个新的主题 Bean

### Cli命令

可以通过 Cli 命令创建主题 Bean。比如，在 a-demo 模块中创建一个主题 Bean `orange`

```bash
$ zova :create:theme orange --module=demo-basic
```

- 该指令会自动创建一个 Bean 文件：`a-demo/src/bean/theme.orange.ts`，对应的 Bean 标识是：`a-demo.theme.orange`

### 定制apply方法

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

### 切换主题

接下来就可以在代码中动态切换主题

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
