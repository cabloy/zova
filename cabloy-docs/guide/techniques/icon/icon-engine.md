# SVG Icon

For a large system, no matter how many icons are built into the framework, it is not enough. For this purpose, Cabloy-Front provides an icon engine

## Advantages

1. `Easy to maintain`: icons can be added very conveniently
2. `Excellent performance`: Taking into account both `file size` and `download speed` performance considerations. No matter how many icons are used in the system, the best balance is always maintained
3. `Asynchronous loading`: All icons are loaded asynchronously on demand, using grouped files as the loading unit
4. `UI library independent`: no matter which UI library is used, the same icon engine is used

## Basic principles

1. `Icon group`: Combine several SVG icons into one group. Each group represents an `asynchronously loaded` icon file
2. `Icon module`: An icon module can contain multiple groups, and a system can create multiple icon modules

## Icon naming convention

For ease of use, it is necessary to develop a unified icon naming convention:

```bash
{moduleName}:{groupName}:{iconName}
```

For example, Cabloy-Front provides an icon module `a-homeicon`, which has a group `default` and an icon `add` in the group. Then, the full name of this icon is: `a-homeicon:default:add`

### Special conventions

In order to further simplify the use of icons, the following conventions have been made:

1. Can be omitted if module name is `a-homeicon`
2. Can be omitted if group name is `default`

Examples are as follows:

| Full name                   | Short name           |
| --------------------------- | -------------------- |
| a-homeicon:default:add      | ::add                |
| a-homeicon:auth:github      | :auth:github         |
| test-othericon:default:icon | test-othericon::icon |

## $icon

Cabloy-Front 在`BeanBase`基类中注入了`$icon`方法，从而可以在任何 bean 实例中通过`this.$icon`获取到类型化的图标名称，从而支持智能提示

## $iconh

Cabloy-Front 在`BeanBase`基类中注入了`$iconh`方法，从而可以在任何 bean 实例中通过`this.$iconh`直接生成图标的 vnode 对象

## 使用图标

图标引擎提供了统一的接口，在任何 UI 库都可以直接使用

### 1. antdv

```typescript
import { Button } from 'ant-design-vue';
<Button icon={this.$iconh('::add')}></Button>
```

### 2. element-plus

```typescript
import { ElButton } from 'element-plus';
<ElButton icon={this.$icon('::add')}></ElButton>
```

### 3. quasar

```typescript
import { QBtn } from 'quasar';
<QBtn icon={this.$icon('::add')}></QBtn>;
```

### 4. vuetify

```typescript
import { VBtn } from 'vuetify/components';
<VBtn icon={this.$icon('::add')}></VBtn>;
```

## 创建图标

### 1. 准备图标

将 SVG 图标放入图标模块的分组目录中。比如模块`a-homeicon`的`default`分组，其分组目录路径是：
`src/suite/a-home/modules/a-homeicon/icons`

### 2. 构建图标

通过 cli 命令执行构建，就会自动把 SVG 图标按分组生成图标文件

```bash
$ cabloy front:tools:icons a-homeicon
```

## 创建图标模块

除了模块`a-homeicon`，还可以创建若干新的图标模块，在其中添加图标

可以通过 cli 命令创建图标模块

```bash
$ cabloy front:create:module
```

- 在命令行提示中，输入`模块名称`，并选择`图标模块模版`即可
