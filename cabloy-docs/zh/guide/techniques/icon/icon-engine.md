# 图标

对于一个大型系统而言，无论框架内置多少图标都是不够用的。为此，Cabloy-Front 提供了一个`图标引擎`

## 优点

1. `易于维护`：可以非常方便的添加图标
2. `性能优异`：兼顾`文件体积`与`下载速度`两方面的性能考量。不论系统中使用了多少图标，都始终保持最佳的平衡状态
3. `异步加载`：所有图标都是按需异步加载，以分组文件作为加载单元
4. `UI库无关`：不论采用何种 UI 库，都采用一致的图标引擎

## 基本原则

1. `图标分组`：将若干个 SVG 图标合为一个分组。每个分组代表一个`异步加载`的图标文件
2. `图标模块`：一个图标模块可以包含多个分组，一个系统可以创建多个图标模块

## 图标命名规范

为了方便使用，有必要制定统一的图标命名规范：

```bash
{moduleName}:{groupName}:{iconName}
```

比如，Cabloy-Front 提供了一个图标模块`a-homeicon`，其中有一个分组`default`，该分组中有一个图标`add`。那么，此图标的全称就是：`a-homeicon:default:add`

### 特殊约定

为了进一步简化图标的使用，特别做了如下约定：

1. 如果模块名称是`a-homeicon`，则可以省略
2. 如果分组名称是`default`，则可以省略

举例如下：

| 全称                        | 简称                 |
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
$ cabloy front:create:module test-icon --template=icon --suite=a-demo
```
