# 快速上手

## 创建一个Cabloy-Front应用

### 1. 前置条件

```bash
# 安装pnpm
$ npm install -g pnpm
# 安装@cabloy/cli
$ pnpm add -g @cabloy/cli
```

### 2. 创建项目

```bash
$ cabloy front:create:project projectName
```

1. 直接在命令行执行`cabloy`创建一个项目，名称为`projectName`
2. 命令行会列出模版列表，当前提供的模版如下：

   - cabloy-front + antdv
   - cabloy-front + element-plus
   - cabloy-front + quasar
   - cabloy-front + vuetify
   - cabloy-front only

3. 在这里，我们选择`cabloy-front only`

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
