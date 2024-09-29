# 快速上手

## 创建一个Zova应用

### 1. 前置条件

- npm 包管理器：pnpm

```bash
$ npm install -g pnpm
```

- 命令行工具：zova-cli

```bash
$ pnpm add -g zova-cli
```

- VS Code 插件：[Zova - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.zova-vscode)

强烈建议安装此 VS Code 插件，从而获得更便捷、更愉悦的开发体验

### 2. 创建项目

```bash
$ zova :create:project projectName
```

1. 直接在命令行执行`zova`创建一个项目，名称为`projectName`
2. 命令行会列出模版列表，当前提供的模版如下：

   - zova + antdv
   - zova + element-plus
   - zova + quasar
   - zova + vuetify
   - zova only

3. 在这里，我们选择`zova only`

### 3. 安装依赖

```bash
$ pnpm install
```

### 4. 启动开发服务

```bash
$ npm run dev
```

### 5. 构建项目

```bash
$ npm run build
```
