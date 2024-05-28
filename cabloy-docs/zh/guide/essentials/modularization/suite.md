# 套件

## 套件的由来

随着项目不断迭代演进，创建的业务模块也会随之膨胀。此外，对于某些业务场景，往往需要多个模块的配合实现。针对以上问题，Cabloy-Front 引入了`套件`的概念。简而言之，`套件`就是一组业务模块的组合，往往对应于某个具体的业务场景，比如`电商`、`CRM`、`供应链`，等等

## 命名约定

套件采用与模块类似的命名约定：

```bash
完整名: cabloy-suite-front-{providerId}-{suiteName}
短名: {providerId}-{suiteName}
```

- providerId: 提供者 Id
- suiteName: 套件名称

## 目录结构

套件是一组业务模块的组合，因此目录结构也非常简单。以套件`a-home`为例：

```bash
a-home
├── modules
│   ├── a-home
│   ├── home-api
│   ├── home-icon
│   ├── a-homelayout
│   ├── a-homemock
│   ├── a-homepagesystem
│   ├── a-homerouter
│   └── ...
└── package.json
```

## 新建套件

可以使用 cli 命令创建套件文件骨架，比如新建一个套件`test-home`

```bash
$ cabloy front:create:suite test-home
```
