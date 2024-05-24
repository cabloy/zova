# Icon

For a large system, no matter how many icons are built into the framework, it is not enough. For this purpose, Cabloy-Front provides an `icon engine`

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

Cabloy-Front injects the `$icon` method into the `BeanBase` base class, so that the typed icon name can be obtained through `this.$icon` in any bean instance, thus supporting auto-completion

## $iconh

Cabloy-Front injects the `$iconh` method into the `BeanBase` base class, so that the `vnode` object of icon can be directly generated in any bean instance through `this.$iconh`

## Use Icon

The icon engine provides a unified interface that can be used directly in any UI library

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

## Create Icon

### 1. Prepare icon

Place the SVG icon into the icon module's group directory. For example, the `default` group of module `a-homeicon` has the group directory path:
`src/suite/a-home/modules/a-homeicon/icons`

### 2. Build icon

Executing the build through the cli command will automatically group the SVG icons into icon files

```bash
$ cabloy front:tools:icons a-homeicon
```

## Create Icon Module

In addition to the module `a-homeicon`, you can also create several new icon modules and add icons to them

Icon modules can be created through the cli command:

```bash
$ cabloy front:create:module test-icon --template=icon --suite=a-demo
```
