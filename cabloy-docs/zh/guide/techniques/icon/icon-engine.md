# SVG图标

对于一个大型系统而言，无论框架内置多少图标都是不够用的。为此，Cabloy-Front 提供了一个图标引擎。通过这个图标引擎，可以非常方便的添加自定义图标，并且让图标文件大小与下载性能始终保持最佳的平衡状态

## 基本原则

1. `图标分组`：将若干个 SVG 图标合为一个分组。每个分组代表一个`异步加载`的图标文件
2. `图标模块`：一个图标模块可以包含多个分组，一个系统可以创建多个图标模块
3. `异步加载`：所有图标都是按需异步加载，以分组文件作为加载单元
4. `UI库无关`：不论采用何种 UI 库，都采用一致的图标引擎

## 图标命名规范

为了方便使用，有必要制定统一的图标命名规范：

```bash
{moduleName}:{groupName}:{iconName}
```

比如，Cabloy-Front 提供了一个图标模块`a-homeicon`，其中有一个分组`default`，该分组中有一个图标`add`。那么，此图标的全称就是：`a-homeicon:default:add`

### 特殊约定

为了简化图标的使用，特别做了如下约定：

1. 如果模块名称是`a-homeicon`，则可以省略
2. 如果分组名称是`default`，则可以省略

举例如下：
|全称|简称|
|--|--|
|a-homeicon:default:add|::add|
|a-homeicon:auth:github|:auth:github|
|test-othericon:default:icon|test-othericon::icon|
